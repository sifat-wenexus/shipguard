import type { SubscriptionWithPaginatedResult } from '~/modules/query/prisma-extended.server';
import type { QueryType } from '~/modules/query/schema/query-schema';
import type { ModelNames } from '~/modules/query/types/model-names';
import { LiveQueryClient } from '~/modules/query/live-query.client';

export interface Pagination<D> {
  data: D;
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export class LiveQueryPaginatedClient<R, D extends Pagination<R> = Pagination<R>>
  extends LiveQueryClient<D, R>
  implements SubscriptionWithPaginatedResult<R>
{
  constructor(
    count: number,
    public readonly model: ModelNames,
    public readonly type: QueryType,
    public readonly query: Record<string, any>
  ) {
    super(model, type, query, (data) => {
      this._pageSize = data.pageSize;
      this._totalPages = data.totalPages;
      this._totalItems = data.totalItems;
      this._page = data.page;

      return data.data;
    });

    this._totalItems = count;
    this._pageSize = query.pageSize ?? 20;
    this._totalPages = Math.ceil(count / this._pageSize);
    this._page = query.page ?? 1;
  }

  private _pageSize: number = 0;
  private _totalPages: number = 0;
  private _totalItems: number = 0;
  private _page: number = 0;

  get page() {
    return this._page;
  }

  get pageSize() {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
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

  next() {
    return this.jumpTo(this._page + 1);
  }

  previous() {
    return this.jumpTo(this._page - 1);
  }

  async jumpTo(page: number) {
    if (page < 1 || page > this._totalPages || page === this._page) {
      return Promise.resolve(void 0);
    }

    this.query.page = page;
    this._page = page;

    return this.refresh(this.query);
  }
}
