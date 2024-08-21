import type { SubscriptionWithPaginatedResult } from '~/modules/query/prisma-extended.server';
import type { QuerySchema } from '~/modules/query/schema/query-schema';
import { LiveQueryServer } from '~/modules/query/live-query.server';
import type { QueryServer } from '~/modules/query/query.server';
import { prisma } from '~/modules/prisma.server';
import type { Session } from '~/shopify-api/lib';
import _ from 'lodash';

export class LiveQueryPaginatedServer<D = Record<string, any>[]>
  extends LiveQueryServer<D>
  implements SubscriptionWithPaginatedResult<D>
{
  constructor(
    count: number,
    schema: QuerySchema,
    server: QueryServer,
    public readonly dependencies: Set<string>,
    public readonly scope?: string,
    public session?: Session
  ) {
    const queryClone = _.clone(schema.query);
    const pageSize = queryClone.pageSize ?? 20;
    const page = queryClone.page ?? 1;

    queryClone.take = pageSize;
    queryClone.skip = (page - 1) * pageSize;

    delete queryClone.pageSize;
    delete queryClone.page;

    schema = {
      subscribe: schema.subscribe,
      model: schema.model,
      query: queryClone,
      type: schema.type,
    };

    super(schema, server, dependencies, scope, session);

    this._totalItems = count;
    this._pageSize = pageSize;
    this._totalPages = Math.ceil(count / this._pageSize);
    this._page = page;
  }

  private readonly _pageSize: number = 0;
  private _totalPages: number = 0;
  private _totalItems: number = 0;
  private _page: number = 0;

  get page() {
    return this._page;
  }

  get pageSize() {
    return this._pageSize;
  }

  get totalItems() {
    return this._totalItems;
  }

  get totalPages() {
    return this._totalPages;
  }

  get hasNext() {
    if (this.totalPages === 0) {
      return false;
    }

    return this.page < this.totalPages;
  }

  get hasPrev() {
    return this.page > 1;
  }

  async refresh() {
    const count = await (prisma[this.schema.model] as any).count({
      where: this.schema.query.where,
    });

    this._totalItems = count;
    this._totalPages = Math.ceil(count / this._pageSize);

    this.schema.query.take = this._pageSize;
    this.schema.query.skip = (this._page - 1) * this._pageSize;

    return super.refresh();
  }

  next(): Promise<D | null> {
    return this.jumpTo(this._page + 1);
  }

  previous(): Promise<D | null> {
    return this.jumpTo(this._page - 1);
  }

  jumpTo(page: number): Promise<D | null> {
    if (page < 1 || page > this._totalPages || page === this._page) {
      return Promise.resolve(null);
    }

    this._page = page;
    this.schema.query.page = this._page;

    return this.refresh();
  }

  firstPage(): Promise<D> {
    return new Promise((resolve) => {
      if (this.page !== 1) {
        this.jumpTo(1).then((data) => resolve(data!))
      } else {
        this.refresh().then(resolve);
      }
    });
  }
}
