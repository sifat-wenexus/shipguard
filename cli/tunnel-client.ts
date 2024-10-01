import * as tls from 'node:tls';
import WebSocket from 'ws';
import net from 'node:net';

type Router = (meta: RequestMeta) => string | URL;

interface Options {
  tunnelURL: string | URL;
  target: string | URL | Router;
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

  private extractRequestMeta(data: Buffer): RequestMeta {
    const CRLF = '\r\n';
    const SPACE = ' ';
    const requestLineEnd = data.indexOf(CRLF);

    const requestLine = data
      .subarray(0, requestLineEnd)
      .toString('ascii');
    const [method, url] = requestLine.split(SPACE);

    const headersEnd = data.indexOf(CRLF + CRLF, requestLineEnd);

    const headers = data
      .subarray(requestLineEnd + CRLF.length, headersEnd)
      .toString('ascii')
      .split(CRLF)
      .reduce((acc, line) => {
        const [key, value] = line.split(': ');

        acc[key.toLowerCase()] = value;

        return acc;
      }, {} as Record<string, string>);

    return {
      id: headers['x-tunnel-request-id'],
      headers,
      method,
      url,
    };
  }

  private setupRequest(data: Buffer) {
    const { target } = this.options;

    const meta = this.extractRequestMeta(data);

    const targetURL = new URL(
      typeof target === 'function' ? target(meta) : target,
    );

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
        console.error(`Failed to connect, max retries exceeded. \nHost: ${targetURL.hostname}:${port} \n Path: ${meta.url}\nMethod: ${meta.method}`);

        return;
      }

      let tcp: net.Socket | tls.TLSSocket;

      if (!isSecure) {
        tcp = new net.Socket();
      } else {
        tcp = new tls.TLSSocket(new net.Socket());
      }

      tcp.once('error', () => {
        console.error(`Failed to transfer request to local server, retrying in 1s. \nHost: ${targetURL.hostname}:${port} \n Path: ${meta.url}\nMethod: ${meta.method}`);

        setTimeout(setupSocket, 1000);
      });

      tcp.once('ready', () => {
        tcp.write(data);

        const tunnelURL = new URL(this.options.tunnelURL);

        tunnelURL.searchParams.append('id', meta.id);
        tunnelURL.searchParams.set('channel', 'data');

        const setupWs = () => {
          const ws = new WebSocket(tunnelURL);

          ws.on('message', (data) => tcp.write(data as Buffer));

          ws.once('error', () => {
            console.error(`Failed to establish request channel with tunnel, retrying in 1s. \nHost: ${targetURL.hostname}:${port} \n Path: ${meta.url}\nMethod: ${meta.method}`);

            setTimeout(setupWs, 1000);
          });

          ws.once('open', () => {
            this.sockets[meta.id] = { ws, tcp: tcp };

            ws.once('close', () => {
              if (tcp.readyState !== 'closed') {
                tcp.end();
              }

              delete this.sockets[meta.id];
            });

            tcp.once('close', () => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.close();
              } else if (ws.readyState !== WebSocket.CLOSED && ws.readyState !== WebSocket.CLOSING) {
                ws.once('open', () => ws.close());
              }
            });
            tcp.on('data', (data) => ws.send(data));
          });
        };

        setupWs();
      });

      tcp.connect(port, targetURL.hostname);
    };

    setupSocket();
  }
}
