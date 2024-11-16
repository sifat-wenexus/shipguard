-- CreateEnum
CREATE TYPE "AppStatus" AS ENUM ('INSTALLED', 'INITIALIZING', 'UPDATING', 'READY');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ScrollToTopButtonShape" AS ENUM ('CIRCLE', 'SQUARE', 'ROUNDED');

-- CreateEnum
CREATE TYPE "SalesCampaignDiscountType" AS ENUM ('PERCENTAGE', 'FIXED_PRICE', 'AMOUNT_OFF');

-- CreateEnum
CREATE TYPE "SalesCampaignGroupType" AS ENUM ('INCLUDE', 'EXCLUDE');

-- CreateEnum
CREATE TYPE "SalesCampaignRangeType" AS ENUM ('ALL_PRODUCTS_SAME_DISCOUNT', 'DIFFERENT_DISCOUNTS_PER_GROUP');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('CREATED', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timezone" (
    "id" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "gmtOffset" TEXT NOT NULL,

    CONSTRAINT "Timezone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" BIGINT,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" TIMESTAMPTZ,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "appInstallationId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "appStatus" "AppStatus" NOT NULL DEFAULT 'INSTALLED',
    "timezoneId" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "moneyFormat" TEXT NOT NULL,
    "moneyInEmailsFormat" TEXT NOT NULL,
    "moneyWithCurrencyFormat" TEXT NOT NULL,
    "moneyWithCurrencyInEmailsFormat" TEXT NOT NULL,
    "lastMigrationId" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "storeId" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'CREATED',
    "name" TEXT NOT NULL,
    "payload" JSONB,
    "result" JSONB,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "storeId" TEXT,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeImage" (
    "id" TEXT NOT NULL,
    "settingId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BadgeImage_pkey" PRIMARY KEY ("settingId","id")
);

-- CreateTable
CREATE TABLE "BadgeGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BadgeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeSettings" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "BadgeSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScrollToTopSettings" (
    "id" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'one',
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "showOnMobile" BOOLEAN NOT NULL DEFAULT true,
    "showOnDesktop" BOOLEAN NOT NULL DEFAULT true,
    "backgroundColor" TEXT NOT NULL DEFAULT 'rgba(227, 227, 227, 1)',
    "iconColor" TEXT NOT NULL DEFAULT 'rgba(48, 48, 48, 1)',
    "padding" INTEGER NOT NULL DEFAULT 10,
    "shape" "ScrollToTopButtonShape" NOT NULL DEFAULT 'ROUNDED',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ScrollToTopSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "featuredImage" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "title" TEXT NOT NULL,
    "vendor" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "featuredImage" TEXT,
    "handle" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sku" TEXT,
    "title" TEXT NOT NULL,
    "featuredImage" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "compareAtPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "inventoryQuantity" INTEGER NOT NULL DEFAULT 0,
    "sellableOnlineQuantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesCampaign" (
    "id" SERIAL NOT NULL,
    "storeId" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "rangeType" "SalesCampaignRangeType" NOT NULL DEFAULT 'ALL_PRODUCTS_SAME_DISCOUNT',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createCollection" BOOLEAN NOT NULL DEFAULT false,
    "collectionHandle" TEXT,
    "startDate" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMPTZ,
    "startDateTimezoneId" TEXT NOT NULL,
    "endDateTimezoneId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ,

    CONSTRAINT "SalesCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesCampaignInclude" (
    "id" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "name" TEXT,
    "allProducts" BOOLEAN NOT NULL DEFAULT false,
    "productVendors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "productTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "productTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "productTitle" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "discountType" "SalesCampaignDiscountType",
    "discountValue" DECIMAL(10,2),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalesCampaignInclude_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesCampaignExclude" (
    "id" INTEGER NOT NULL,
    "includeId" INTEGER,
    "campaignId" INTEGER,
    "productVendors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "productTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "productTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "productTitle" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalesCampaignExclude_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesCampaignVariant" (
    "campaignId" INTEGER NOT NULL,
    "variantId" TEXT NOT NULL,
    "backupPrice" DECIMAL(10,2) NOT NULL,
    "backupCompareAtPrice" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalesCampaignVariant_pkey" PRIMARY KEY ("campaignId","variantId")
);

-- CreateTable
CREATE TABLE "Migration" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Migration_pkey" PRIMARY KEY ("storeId","id")
);

-- CreateTable
CREATE TABLE "_BadgeGroupToFile" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CollectionToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CollectionToSalesCampaignInclude" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CollectionToSalesCampaignExclude" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToSalesCampaignInclude" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToSalesCampaignExclude" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductVariantToSalesCampaignInclude" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductVariantToSalesCampaignExclude" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Session_shop_userId_idx" ON "Session"("shop", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_domain_key" ON "Store"("domain");

-- CreateIndex
CREATE INDEX "Store_appInstallationId_idx" ON "Store"("appInstallationId");

-- CreateIndex
CREATE INDEX "Job_status_storeId_name_idx" ON "Job"("status", "storeId", "name");

-- CreateIndex
CREATE INDEX "File_storeId_idx" ON "File"("storeId");

-- CreateIndex
CREATE INDEX "Collection_storeId_idx" ON "Collection"("storeId");

-- CreateIndex
CREATE INDEX "Product_storeId_idx" ON "Product"("storeId");

-- CreateIndex
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

-- CreateIndex
CREATE INDEX "SalesCampaign_storeId_idx" ON "SalesCampaign"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "_BadgeGroupToFile_AB_unique" ON "_BadgeGroupToFile"("A", "B");

-- CreateIndex
CREATE INDEX "_BadgeGroupToFile_B_index" ON "_BadgeGroupToFile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToProduct_AB_unique" ON "_CollectionToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToProduct_B_index" ON "_CollectionToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToSalesCampaignInclude_AB_unique" ON "_CollectionToSalesCampaignInclude"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToSalesCampaignInclude_B_index" ON "_CollectionToSalesCampaignInclude"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToSalesCampaignExclude_AB_unique" ON "_CollectionToSalesCampaignExclude"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToSalesCampaignExclude_B_index" ON "_CollectionToSalesCampaignExclude"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSalesCampaignInclude_AB_unique" ON "_ProductToSalesCampaignInclude"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSalesCampaignInclude_B_index" ON "_ProductToSalesCampaignInclude"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSalesCampaignExclude_AB_unique" ON "_ProductToSalesCampaignExclude"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSalesCampaignExclude_B_index" ON "_ProductToSalesCampaignExclude"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductVariantToSalesCampaignInclude_AB_unique" ON "_ProductVariantToSalesCampaignInclude"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductVariantToSalesCampaignInclude_B_index" ON "_ProductVariantToSalesCampaignInclude"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductVariantToSalesCampaignExclude_AB_unique" ON "_ProductVariantToSalesCampaignExclude"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductVariantToSalesCampaignExclude_B_index" ON "_ProductVariantToSalesCampaignExclude"("B");

-- AddForeignKey
ALTER TABLE "Timezone" ADD CONSTRAINT "Timezone_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_timezoneId_fkey" FOREIGN KEY ("timezoneId") REFERENCES "Timezone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeImage" ADD CONSTRAINT "BadgeImage_id_fkey" FOREIGN KEY ("id") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeImage" ADD CONSTRAINT "BadgeImage_settingId_fkey" FOREIGN KEY ("settingId") REFERENCES "BadgeSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BadgeSettings" ADD CONSTRAINT "BadgeSettings_id_fkey" FOREIGN KEY ("id") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScrollToTopSettings" ADD CONSTRAINT "ScrollToTopSettings_id_fkey" FOREIGN KEY ("id") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesCampaign" ADD CONSTRAINT "SalesCampaign_startDateTimezoneId_fkey" FOREIGN KEY ("startDateTimezoneId") REFERENCES "Timezone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesCampaign" ADD CONSTRAINT "SalesCampaign_endDateTimezoneId_fkey" FOREIGN KEY ("endDateTimezoneId") REFERENCES "Timezone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesCampaign" ADD CONSTRAINT "SalesCampaign_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesCampaignInclude" ADD CONSTRAINT "SalesCampaignInclude_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "SalesCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesCampaignExclude" ADD CONSTRAINT "SalesCampaignExclude_includeId_fkey" FOREIGN KEY ("includeId") REFERENCES "SalesCampaignInclude"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesCampaignExclude" ADD CONSTRAINT "SalesCampaignExclude_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "SalesCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesCampaignVariant" ADD CONSTRAINT "SalesCampaignVariant_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "SalesCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesCampaignVariant" ADD CONSTRAINT "SalesCampaignVariant_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Migration" ADD CONSTRAINT "Migration_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeGroupToFile" ADD CONSTRAINT "_BadgeGroupToFile_A_fkey" FOREIGN KEY ("A") REFERENCES "BadgeGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeGroupToFile" ADD CONSTRAINT "_BadgeGroupToFile_B_fkey" FOREIGN KEY ("B") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToProduct" ADD CONSTRAINT "_CollectionToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToProduct" ADD CONSTRAINT "_CollectionToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToSalesCampaignInclude" ADD CONSTRAINT "_CollectionToSalesCampaignInclude_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToSalesCampaignInclude" ADD CONSTRAINT "_CollectionToSalesCampaignInclude_B_fkey" FOREIGN KEY ("B") REFERENCES "SalesCampaignInclude"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToSalesCampaignExclude" ADD CONSTRAINT "_CollectionToSalesCampaignExclude_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToSalesCampaignExclude" ADD CONSTRAINT "_CollectionToSalesCampaignExclude_B_fkey" FOREIGN KEY ("B") REFERENCES "SalesCampaignExclude"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSalesCampaignInclude" ADD CONSTRAINT "_ProductToSalesCampaignInclude_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSalesCampaignInclude" ADD CONSTRAINT "_ProductToSalesCampaignInclude_B_fkey" FOREIGN KEY ("B") REFERENCES "SalesCampaignInclude"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSalesCampaignExclude" ADD CONSTRAINT "_ProductToSalesCampaignExclude_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSalesCampaignExclude" ADD CONSTRAINT "_ProductToSalesCampaignExclude_B_fkey" FOREIGN KEY ("B") REFERENCES "SalesCampaignExclude"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductVariantToSalesCampaignInclude" ADD CONSTRAINT "_ProductVariantToSalesCampaignInclude_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductVariantToSalesCampaignInclude" ADD CONSTRAINT "_ProductVariantToSalesCampaignInclude_B_fkey" FOREIGN KEY ("B") REFERENCES "SalesCampaignInclude"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductVariantToSalesCampaignExclude" ADD CONSTRAINT "_ProductVariantToSalesCampaignExclude_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductVariantToSalesCampaignExclude" ADD CONSTRAINT "_ProductVariantToSalesCampaignExclude_B_fkey" FOREIGN KEY ("B") REFERENCES "SalesCampaignExclude"("id") ON DELETE CASCADE ON UPDATE CASCADE;
