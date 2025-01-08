import * as tls from 'node:tls';
import WebSocket from 'ws';
import net from 'node:net';

type Router = (
  meta: RequestMeta,
) => string | URL | { headers: Record<string, string>; url: string | URL };

interface Options {
  tunnelURL: string | URL;
  routerOrTarget: string | URL | Router;
}

interface Sockets {
  ws: WebSocket;
  tcp: net.Socket;
}

interface RequestMeta {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
}

interface RequestParts {
  requestLine: Buffer;
  headers: Buffer;
  body: Buffer;
}

export class Client {
  constructor(private readonly options: Options) {
    this.ready = this.setupMetaChannel();
  }

  private readonly sockets: Record<string, Sockets> = {};

  readonly ready: Promise<void>;

  private setupMetaChannel() {
    return new Promise<void>((resolve, reject) => {
      const { tunnelURL } = this.options;

      const setup = () => {
        let intervalId: NodeJS.Timeout | null = null;
        const ws = new WebSocket(tunnelURL)
          .once('open', resolve)
          .once('error', reject)
          .once('close', () => {
            if (intervalId) {
              clearInterval(intervalId);
            }
            setup();
          })
          .on('message', (data) => this.setupRequest(data as Buffer));
        intervalId = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.ping();
          }
        }, 10000);
      };
      setup();
    });
  }

  private getRequestParts(data: Buffer): RequestParts {
    const CRLF = '\r\n';

    const requestLineEnd = data.indexOf(CRLF);
    const headersEnd = data.indexOf(CRLF + CRLF, requestLineEnd);

    const requestLine = data.subarray(0, requestLineEnd);
    const headers = data.subarray(requestLineEnd + CRLF.length, headersEnd);
    const body = data.subarray(headersEnd + CRLF.length + CRLF.length);

    return {
      requestLine,
      headers,
      body,
    };
  }

  private parseHeaders(headersPart: Buffer): Record<string, string> {
    const CRLF = '\r\n';

    return headersPart
      .toString('ascii')
      .split(CRLF)
      .reduce(
        (acc, line) => {
          const [key, value] = line.split(': ');

          acc[key.toLowerCase()] = value;

          return acc;
        },
        {} as Record<string, string>,
      );
  }

  private compileHeaders(headers: Record<string, string>): Buffer {
    const CRLF = '\r\n';

    return Buffer.from(
      Object.entries(headers)
        .map(([key, value]) => `${key}: ${value}`)
        .join(CRLF),
    );
  }

  private setupRequest(data: Buffer) {
    const { requestLine, headers, body } = this.getRequestParts(data);
    const [method, url] = requestLine.toString('ascii').split(' ');
    const parsedHeaders = this.parseHeaders(headers);
    const id = parsedHeaders['x-tunnel-request-id'];

    const { routerOrTarget } = this.options;

    let targetURL: URL;

    if (typeof routerOrTarget !== 'function') {
      targetURL = new URL(routerOrTarget);
    } else {
      const result = routerOrTarget({
        id: parsedHeaders['x-tunnel-request-id'],
        headers: parsedHeaders,
        method,
        url,
      });

      if (typeof result === 'string') {
        targetURL = new URL(result);
      } else if (result instanceof URL) {
        targetURL = result;
      } else {
        targetURL = new URL(result.url);

        for (const [key, value] of Object.entries(result.headers)) {
          parsedHeaders[key] = value;
        }
      }
    }

    const _url = new URL(url, 'http://localhost');

    targetURL.pathname = targetURL.pathname.replace(/\/$/, '') + _url.pathname;

    for (const [key, value] of _url.searchParams) {
      targetURL.searchParams.append(key, value);
    }

    const isSecure =
      targetURL.protocol === 'https:' ||
      targetURL.protocol === 'wss:' ||
      targetURL.port === '443';

    const port = targetURL.port
      ? parseInt(targetURL.port, 10)
      : targetURL.protocol === 'https:' || targetURL.protocol === 'wss:'
        ? 443
        : 80;

    let retryCount = 0;

    const setupSocket = () => {
      if (retryCount++ > 10) {
        console.error(
          `Failed to connect, max retries exceeded. \nHost: ${targetURL.hostname}:${port} \n Path: ${url}\nMethod: ${method}`,
        );

        return;
      }

      let tcp: net.Socket | tls.TLSSocket;

      if (!isSecure) {
        tcp = new net.Socket();
      } else {
        tcp = new tls.TLSSocket(new net.Socket());
      }

      tcp.once('error', () => {
        console.error(
          `Failed to transfer request to local server, retrying in 1s. \nHost: ${targetURL.hostname}:${port} \n Path: ${url}\nMethod: ${method}`,
        );

        setTimeout(setupSocket, 1000);
      });

      tcp.once('ready', () => {
        const CRLF = Buffer.from('\r\n');

        const requestLine = Buffer.from(
          `${method} ${targetURL.pathname}${targetURL.search} HTTP/1.1`,
        );

        parsedHeaders['content-length'] = body.length.toString();
        const headers = this.compileHeaders(parsedHeaders);
        const finalData = Buffer.concat([requestLine, CRLF, headers, CRLF, CRLF, body]);

        tcp.write(finalData);

        const tunnelURL = new URL(this.options.tunnelURL);

        tunnelURL.searchParams.append('id', id);
        tunnelURL.searchParams.set('channel', 'data');

        let retryCount = 0;

        const setupWs = () => {
          if (retryCount++ > 10) {
            console.error(
              `Failed to establish request channel with tunnel, max retries exceeded. \nHost: ${targetURL.hostname}:${port} \n Path: ${url}\nMethod: ${method}`,
            );

            if (tcp.readyState !== 'closed') {
              tcp.end();
            }

            return;
          }

          const ws = new WebSocket(tunnelURL);

          ws.on('message', (data: Buffer) => tcp.write(data));

          ws.once('error', () => {
            console.error(
              `Failed to establish request channel with tunnel, retrying in 1s. \nHost: ${targetURL.hostname}:${port} \n Path: ${url}\nMethod: ${method}`,
            );

            setTimeout(setupWs, 1000);
          });

          ws.once('open', () => {
            this.sockets[id] = { ws, tcp: tcp };

            ws.once('close', () => {
              if (tcp.readyState !== 'closed') {
                tcp.end();
              }

              delete this.sockets[id];
            });

            tcp.once('close', () => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.close();
              } else if (
                ws.readyState !== WebSocket.CLOSED &&
                ws.readyState !== WebSocket.CLOSING
              ) {
                ws.once('open', () => ws.close());
              }
            });
            tcp.on('data', (data: Buffer) =>
              ws.send(data, {
                binary: true,
              }),
            );
          });
        };

        setupWs();
      });

      tcp.connect(port, targetURL.hostname);
    };

    setupSocket();
  }
}
