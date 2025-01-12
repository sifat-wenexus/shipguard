import type { PaginatedResult } from '~/modules/query/prisma-extended.server';
import type { Pagination } from '~/modules/query/live-query-paginated.client';
import type { QuerySchema } from '~/modules/query/schema/query-schema';
import type { Prisma, PrismaClient } from '#prisma-client';
import { prisma } from '~/modules/prisma.server';
import _ from 'lodash';

export class NormalQueryPaginated<D = Record<string, any>[]>
  implements PaginatedResult<D>
{
  private readonly loadListeners = new Set<(loading: boolean) => void>();
  private readonly handlers = new Set<(data: any) => any>();
  private readonly schema: QuerySchema;
  private data: D | null = null;

  constructor(
    count: number,
    schema: QuerySchema,
    private readonly trx?: Prisma.TransactionClient | PrismaClient
  ) {
    this._totalItems = count;
    this._pageSize = schema.query.pageSize ?? 20;
    this._totalPages = Math.ceil(count / this._pageSize);
    this._page = schema.query.page ?? 1;

    const queryClone = _.clone(schema.query);

    if (typeof window === 'undefined') {
      delete queryClone.pageSize;
      delete queryClone.page;
    }

    this.schema = {
      subscribe: schema.subscribe,
      model: schema.model,
      query: queryClone,
      type: schema.type,
    };
  }

  private _totalItems: number = 0;

  get totalItems() {
    return this._totalItems;
  }

  private _totalPages: number = 0;

  get totalPages() {
    return this._totalPages;
  }

  private _pageSize: number = 0;

  get pageSize() {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
  }

  private _page: number = 0;

  get page() {
    return this._page;
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
    for (const listener of this.loadListeners) {
      listener(true);
    }

    if (typeof window === 'undefined') {
      if (this.data) {
        this._totalItems = await (
          (this.trx ?? prisma)[this.schema.model] as any
        ).count({
          where: this.schema.query.where,
        });
      }

      this.schema.query.take = this._pageSize;
      this.schema.query.skip = (this._page - 1) * this._pageSize;

      delete this.schema.query.page;
      delete this.schema.query.pageSize;

      this.data = await (
        (this.trx ?? prisma)[this.schema.model][this.schema.type] as any
      )(this.schema.query);

      this._totalPages = Math.ceil(this._totalItems / this._pageSize);
    } else {
      const response: Pagination<D> = await fetch(`/api/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: this.schema.type,
          model: this.schema.model,
          query: this.schema.query,
          subscribe: false,
        }),
      }).then((r) => r.json());

      this.data = response.data;

      this._totalItems = response.totalItems;
      this._totalPages = response.totalPages;
      this._page = response.page;
    }

    for (const handler of this.handlers) {
      handler(this.data);
    }

    for (const listener of this.loadListeners) {
      listener(false);
    }
  }

  next() {
    return this.jumpTo(this._page + 1);
  }

  previous() {
    return this.jumpTo(this._page - 1);
  }

  jumpTo(page: number) {
    if (page < 1 || page > this._totalPages || page === this._page) {
      return Promise.resolve(void 0);
    }

    this._page = page;
    this.schema.query.page = this._page;
    return this.refresh();
  }

  addListener(handler: (data: D) => any) {
    this.handlers.add(handler);

    if (!this.data) {
      this.refresh();
    } else if (this.handlers.size === 1) {
      handler(this.data);
    }

    return this;
  }

  removeListener(handler: (data: D) => any) {
    this.handlers.delete(handler);
    return this;
  }

  onLoading(callback: (loading: boolean) => void): () => void {
    this.loadListeners.add(callback);

    return () => {
      this.loadListeners.delete(callback);
    };
  }
}
