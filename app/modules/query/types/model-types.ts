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
  gmailAuthCredential: {
    model: Base.GmailAuthCredential;
    whereInput: Base.Prisma.GmailAuthCredentialWhereInput;
  }
  smtpSetting: {
    model: Base.SmtpSetting;
    whereInput: Base.Prisma.SmtpSettingWhereInput;
  }
}
