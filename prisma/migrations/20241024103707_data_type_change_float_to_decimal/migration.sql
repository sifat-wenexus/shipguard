/*
  Warnings:

  - The `compareAtPrice` column on the `ExcludedPackageProtectionVariant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `price` column on the `PackageProtection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `minimumFee` column on the `PackageProtection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `maximumFee` column on the `PackageProtection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `refundAmount` column on the `PackageProtectionOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `orderAmount` column on the `PackageProtectionOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `protectionFee` column on the `PackageProtectionOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ExcludedPackageProtectionVariant" DROP COLUMN "compareAtPrice",
ADD COLUMN     "compareAtPrice" MONEY;

-- AlterTable
ALTER TABLE "PackageProtection" DROP COLUMN "price",
ADD COLUMN     "price" MONEY NOT NULL DEFAULT 0,
DROP COLUMN "minimumFee",
ADD COLUMN     "minimumFee" MONEY NOT NULL DEFAULT 0,
DROP COLUMN "maximumFee",
ADD COLUMN     "maximumFee" MONEY NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PackageProtectionOrder" DROP COLUMN "refundAmount",
ADD COLUMN     "refundAmount" MONEY NOT NULL DEFAULT 0.00,
DROP COLUMN "orderAmount",
ADD COLUMN     "orderAmount" MONEY NOT NULL DEFAULT 0.00,
DROP COLUMN "protectionFee",
ADD COLUMN     "protectionFee" MONEY NOT NULL DEFAULT 0.00;
