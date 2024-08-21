import type { SalesCampaignDiscountType, SalesCampaignRangeType, ContentStatus } from '#prisma-client';

export interface ExcludeSimplified {
  id: number | null;
  productVendors: string[];
  productTypes: string[];
  productTags: string[];
  collections: string[];
  products: string[];
  productVariants: string[];
}

export interface IncludeSimplified {
  id: number | null;
  name: string;
  discountType: SalesCampaignDiscountType;
  discountValue: string;
  all: boolean;
  products: string[];
  collections: string[];
  productTypes: string[];
  productTags: string[];
  productVendors: string[];
  excludes: ExcludeSimplified[];
}

interface TimeZone {
  id: string;
  title: string;
}

export interface SalesCampaignState {
  id: number | null,
  title: string,
  createCollection: boolean,
  status: ContentStatus,
  startDate?: string,
  endDate?: string,
  startTimeZone: TimeZone,
  endTimeZone: TimeZone,
  rangeType: SalesCampaignRangeType,
  includes: IncludeSimplified[],
  excludes: ExcludeSimplified[],
  currentIncludeIndex: number,
  currentExcludeIndex: number,
}
