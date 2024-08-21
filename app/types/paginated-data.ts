export interface PaginatedData<T = Record<string, any>> {
  pageInfo: {
    page: number;
    perPage: number;
    totalPages: number;
    count: number;
  };
  data: T[];
}
