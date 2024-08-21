import { prisma } from '~/modules/prisma.server';
import crypto from 'crypto';

export interface SSEToken {
  value: string;
  lastAccess: number;
}

export class SSETokenStore {
  constructor() {
    setInterval(() => {
      const now = Date.now();

      for (const shop in this.tokens) {
        for (const sessionId in this.tokens[shop]) {
          const token = this.tokens[shop][sessionId];

          if (
            now - token.lastAccess > 1000 * 60 * 60
          ) {
            delete this.tokens[shop][sessionId];
          }
        }
      }
    }, 1000 * 60 * 60);
  }

  private readonly tokens: Record<string, Record<string, SSEToken>> = {};

  public generateToken(size = 128) {
    return crypto.randomBytes(size).toString('hex');
  }

  public async createToken(shop: string, sessionId: string): Promise<SSEToken> {
    const token: SSEToken = {
      value: this.generateToken(),
      lastAccess: Date.now(),
    };

    if (!this.tokens[shop]) {
      this.tokens[shop] = {};
    }

    this.tokens[shop][sessionId] = token;

    await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        sseToken: token.value,
      },
    });

    return token;
  }

  public async getToken(shop: string, sessionId: string): Promise<SSEToken | null> {
    let token = this.tokens[shop]?.[sessionId];

    if (token) {
      token.lastAccess = Date.now();
    } else {
      const session = await prisma.session.findUnique({
        where: {
          id: sessionId,
        },
        select: {
          sseToken: true,
        },
      });

      if (session?.sseToken) {
        token = {
          value: session.sseToken,
          lastAccess: Date.now(),
        };

        if (!this.tokens[shop]) {
          this.tokens[shop] = {};
        }

        this.tokens[shop][sessionId] = token;
      }
    }

    return token;
  }

  public async createOrGetToken(shop: string, sessionId: string): Promise<SSEToken> {
    return (await this.getToken(shop, sessionId)) ?? (await this.createToken(shop, sessionId));
  }

  public async verifyToken(shop: string, sessionId: string, token: string): Promise<SSEToken | null> {
    const tokenData = await this.getToken(shop, sessionId);

    if (!tokenData || tokenData.value !== token) {
      return null;
    }

    return tokenData;
  }
}

export const sseTokenStore = new SSETokenStore();
