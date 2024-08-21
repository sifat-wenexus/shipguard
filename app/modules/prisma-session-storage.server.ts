import type { PrismaClient, Session as Row } from '#prisma-client';
import type { SessionStorage } from '~/shopify-session-storage';
import type { Optional } from '~/types/type-utils';
import { Session } from '~/shopify-api/lib';

interface PrismaSessionStorageOptions {
  tableName?: string;
}

export class PrismaSessionStorage<T extends PrismaClient>
  implements SessionStorage
{
  private readonly ready: Promise<any>;
  private readonly tableName: string = 'session';

  constructor(
    private prisma: T,
    { tableName }: PrismaSessionStorageOptions = {}
  ) {
    if (tableName) {
      this.tableName = tableName;
    }

    if (this.getSessionTable() === undefined) {
      throw new Error(`PrismaClient does not have a ${this.tableName} table`);
    }
    this.ready = this.getSessionTable()
      .count()
      .catch(() => {
        throw new MissingSessionTableError(
          `Prisma ${this.tableName} table does not exist. This could happen for a few reasons, see https://github.com/Shopify/shopify-app-js/tree/main/packages/shopify-app-session-storage-prisma#troubleshooting for more information`
        );
      });
  }

  public async storeSession(session: Session): Promise<boolean> {
    await this.ready;

    const data = this.sessionToRow(session);

    if (!session.storeId) {
      const store = await this.prisma.store.findFirst({
        where: { domain: session.shop },
        select: { id: true },
      });

      if (store) {
        data.storeId = store.id;
      }
    }

    await this.getSessionTable().upsert({
      where: { id: session.id },
      update: data,
      create: data,
    });

    return true;
  }

  public async loadSession(id: string): Promise<Session | undefined> {
    await this.ready;

    const row = await this.getSessionTable().findUnique({
      where: { id },
    });

    if (!row) {
      return undefined;
    }

    return this.rowToSession(row);
  }

  public async deleteSession(id: string): Promise<boolean> {
    await this.ready;

    try {
      await this.getSessionTable().delete({ where: { id } });
    } catch {
      return true;
    }

    return true;
  }

  public async deleteSessions(ids: string[]): Promise<boolean> {
    await this.ready;

    await this.getSessionTable().deleteMany({ where: { id: { in: ids } } });

    return true;
  }

  public async findSessionsByShop(shop: string): Promise<Session[]> {
    await this.ready;

    const sessions = await this.getSessionTable().findMany({
      where: { shop },
      take: 25,
      orderBy: [{ expires: 'desc' }],
    });

    return sessions.map((session) => this.rowToSession(session));
  }

  public sessionToRow(session: Session): Optional<Row, 'createdAt'> {
    const sessionParams = session.toObject();

    return {
      id: session.id,
      shop: session.shop,
      storeId: session.storeId ?? null,
      state: session.state,
      isOnline: session.isOnline,
      scope: session.scope || null,
      expires: session.expires || null,
      accessToken: session.accessToken || '',
      sseToken: session.sseToken || null,
      userId:
        (sessionParams.onlineAccessInfo?.associated_user
          .id as unknown as bigint) || null,
    };
  }

  public rowToSession(row: Row): Session {
    const sessionParams: { [key: string]: boolean | string | number } = {
      id: row.id,
      shop: row.shop,
      state: row.state,
      isOnline: row.isOnline,
    };

    if (row.storeId) {
      sessionParams.storeId = row.storeId;
    }

    if (row.expires) {
      sessionParams.expires = row.expires.getTime();
    }

    if (row.scope) {
      sessionParams.scope = row.scope;
    }

    if (row.accessToken) {
      sessionParams.accessToken = row.accessToken;
    }

    if (row.sseToken) {
      sessionParams.sseToken = row.sseToken;
    }

    if (row.userId) {
      sessionParams.onlineAccessInfo = String(row.userId);
    }

    return Session.fromPropertyArray(Object.entries(sessionParams));
  }

  private getSessionTable(): T['session'] {
    return (this.prisma as any)[this.tableName];
  }
}

export class MissingSessionTableError extends Error {}
