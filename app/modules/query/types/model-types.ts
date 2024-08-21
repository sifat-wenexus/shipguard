import type Base from '#prisma-client';

export interface ModelTypes {
  timezone: {
    model: Base.Timezone;
    whereInput: Base.Prisma.TimezoneWhereInput;
  };
  timezoneSimplified: {
    model: Base.TimezoneSimplified;
    whereInput: Base.Prisma.TimezoneSimplifiedWhereInput;
  };
  session: {
    model: Base.Session;
    whereInput: Base.Prisma.SessionWhereInput;
  };
  store: {
    model: Base.Store;
    whereInput: Base.Prisma.StoreWhereInput;
  };
  job: {
    model: Base.Job;
    whereInput: Base.Prisma.JobWhereInput;
  };
  file: {
    model: Base.File;
    whereInput: Base.Prisma.FileWhereInput;
  };
  badgeImage: {
    model: Base.BadgeImage;
    whereInput: Base.Prisma.BadgeImageWhereInput;
  };
  badgeGroup: {
    model: Base.BadgeGroup;
    whereInput: Base.Prisma.BadgeGroupWhereInput;
  };
  badgeSettings: {
    model: Base.BadgeSettings;
    whereInput: Base.Prisma.BadgeSettingsWhereInput;
  };
  scrollToTopSettings: {
    model: Base.ScrollToTopSettings;
    whereInput: Base.Prisma.ScrollToTopSettingsWhereInput;
  };
  collection: {
    model: Base.Collection;
    whereInput: Base.Prisma.CollectionWhereInput;
  };
  product: {
    model: Base.Product;
    whereInput: Base.Prisma.ProductWhereInput;
  };
  productTag: {
    model: Base.ProductTag;
    whereInput: Base.Prisma.ProductTagWhereInput;
  };
  productVendor: {
    model: Base.ProductVendor;
    whereInput: Base.Prisma.ProductVendorWhereInput;
  };
  productType: {
    model: Base.ProductType;
    whereInput: Base.Prisma.ProductTypeWhereInput;
  };
  productVariant: {
    model: Base.ProductVariant;
    whereInput: Base.Prisma.ProductVariantWhereInput;
  };
  salesCampaign: {
    model: Base.SalesCampaign;
    whereInput: Base.Prisma.SalesCampaignWhereInput;
  };
  salesCampaignInclude: {
    model: Base.SalesCampaignInclude;
    whereInput: Base.Prisma.SalesCampaignIncludeWhereInput;
  };
  salesCampaignExclude: {
    model: Base.SalesCampaignExclude;
    whereInput: Base.Prisma.SalesCampaignExcludeWhereInput;
  };
  salesCampaignVariant: {
    model: Base.SalesCampaignVariant;
    whereInput: Base.Prisma.SalesCampaignVariantWhereInput;
  };
  checkoutTermsSettings: {
    model: Base.CheckoutTermsSettings;
    whereInput: Base.Prisma.CheckoutTermsSettingsWhereInput;
  };
  packageProtection: {
    model: Base.PackageProtection;
    whereInput: Base.Prisma.PackageProtectionWhereInput;
  };
  excludedPackageProtectionProduct: {
    model: Base.ExcludedPackageProtectionProduct;
    whereInput: Base.Prisma.ExcludedPackageProtectionProductWhereInput;
  };
  excludedPackageProtectionVariant: {
    model: Base.ExcludedPackageProtectionVariant;
    whereInput: Base.Prisma.ExcludedPackageProtectionVariantWhereInput;
  };
  packageProtectionOrder: {
    model: Base.PackageProtectionOrder;
    whereInput: Base.Prisma.PackageProtectionOrderWhereInput;
  };
  packageProtectionClaimOrder: {
    model: Base.PackageProtectionClaimOrder;
    whereInput: Base.Prisma.PackageProtectionClaimOrderWhereInput;
  };
  migration: {
    model: Base.Migration;
    whereInput: Base.Prisma.MigrationWhereInput;
  };
}
