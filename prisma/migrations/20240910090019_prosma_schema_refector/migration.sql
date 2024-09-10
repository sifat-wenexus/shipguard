/*
  Warnings:

  - You are about to drop the `BadgeGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BadgeImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BadgeSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CheckoutTermsSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesCampaign` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesCampaignExclude` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesCampaignInclude` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesCampaignVariant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScrollToTopSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BadgeGroupToFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CollectionToSalesCampaignExclude` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CollectionToSalesCampaignInclude` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToSalesCampaignExclude` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToSalesCampaignInclude` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductVariantToSalesCampaignExclude` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductVariantToSalesCampaignInclude` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BadgeImage" DROP CONSTRAINT "BadgeImage_id_fkey";

-- DropForeignKey
ALTER TABLE "BadgeImage" DROP CONSTRAINT "BadgeImage_settingId_fkey";

-- DropForeignKey
ALTER TABLE "BadgeSettings" DROP CONSTRAINT "BadgeSettings_id_fkey";

-- DropForeignKey
ALTER TABLE "CheckoutTermsSettings" DROP CONSTRAINT "CheckoutTermsSettings_storeId_fkey";

-- DropForeignKey
ALTER TABLE "SalesCampaign" DROP CONSTRAINT "SalesCampaign_endDateTimezoneId_fkey";

-- DropForeignKey
ALTER TABLE "SalesCampaign" DROP CONSTRAINT "SalesCampaign_startDateTimezoneId_fkey";

-- DropForeignKey
ALTER TABLE "SalesCampaign" DROP CONSTRAINT "SalesCampaign_storeId_fkey";

-- DropForeignKey
ALTER TABLE "SalesCampaignExclude" DROP CONSTRAINT "SalesCampaignExclude_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "SalesCampaignExclude" DROP CONSTRAINT "SalesCampaignExclude_includeId_fkey";

-- DropForeignKey
ALTER TABLE "SalesCampaignInclude" DROP CONSTRAINT "SalesCampaignInclude_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "SalesCampaignVariant" DROP CONSTRAINT "SalesCampaignVariant_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "SalesCampaignVariant" DROP CONSTRAINT "SalesCampaignVariant_variantId_fkey";

-- DropForeignKey
ALTER TABLE "ScrollToTopSettings" DROP CONSTRAINT "ScrollToTopSettings_id_fkey";

-- DropForeignKey
ALTER TABLE "_BadgeGroupToFile" DROP CONSTRAINT "_BadgeGroupToFile_A_fkey";

-- DropForeignKey
ALTER TABLE "_BadgeGroupToFile" DROP CONSTRAINT "_BadgeGroupToFile_B_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToSalesCampaignExclude" DROP CONSTRAINT "_CollectionToSalesCampaignExclude_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToSalesCampaignExclude" DROP CONSTRAINT "_CollectionToSalesCampaignExclude_B_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToSalesCampaignInclude" DROP CONSTRAINT "_CollectionToSalesCampaignInclude_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToSalesCampaignInclude" DROP CONSTRAINT "_CollectionToSalesCampaignInclude_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSalesCampaignExclude" DROP CONSTRAINT "_ProductToSalesCampaignExclude_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSalesCampaignExclude" DROP CONSTRAINT "_ProductToSalesCampaignExclude_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSalesCampaignInclude" DROP CONSTRAINT "_ProductToSalesCampaignInclude_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSalesCampaignInclude" DROP CONSTRAINT "_ProductToSalesCampaignInclude_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVariantToSalesCampaignExclude" DROP CONSTRAINT "_ProductVariantToSalesCampaignExclude_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVariantToSalesCampaignExclude" DROP CONSTRAINT "_ProductVariantToSalesCampaignExclude_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVariantToSalesCampaignInclude" DROP CONSTRAINT "_ProductVariantToSalesCampaignInclude_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVariantToSalesCampaignInclude" DROP CONSTRAINT "_ProductVariantToSalesCampaignInclude_B_fkey";

-- DropTable
DROP TABLE "BadgeGroup";

-- DropTable
DROP TABLE "BadgeImage";

-- DropTable
DROP TABLE "BadgeSettings";

-- DropTable
DROP TABLE "CheckoutTermsSettings";

-- DropTable
DROP TABLE "SalesCampaign";

-- DropTable
DROP TABLE "SalesCampaignExclude";

-- DropTable
DROP TABLE "SalesCampaignInclude";

-- DropTable
DROP TABLE "SalesCampaignVariant";

-- DropTable
DROP TABLE "ScrollToTopSettings";

-- DropTable
DROP TABLE "_BadgeGroupToFile";

-- DropTable
DROP TABLE "_CollectionToSalesCampaignExclude";

-- DropTable
DROP TABLE "_CollectionToSalesCampaignInclude";

-- DropTable
DROP TABLE "_ProductToSalesCampaignExclude";

-- DropTable
DROP TABLE "_ProductToSalesCampaignInclude";

-- DropTable
DROP TABLE "_ProductVariantToSalesCampaignExclude";

-- DropTable
DROP TABLE "_ProductVariantToSalesCampaignInclude";

-- DropEnum
DROP TYPE "SalesCampaignDiscountType";

-- DropEnum
DROP TYPE "SalesCampaignGroupType";

-- DropEnum
DROP TYPE "SalesCampaignRangeType";

-- DropEnum
DROP TYPE "ScrollToTopButtonShape";

-- CreateTable
CREATE TABLE "EmailTemplate" (
    "id" SERIAL NOT NULL,
    "storeId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmailTemplate" ADD CONSTRAINT "EmailTemplate_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
