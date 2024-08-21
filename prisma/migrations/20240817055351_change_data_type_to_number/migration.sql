/*
  Warnings:

  - The `orderAmount` column on the `PackageProtectionOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `protectionFee` column on the `PackageProtectionOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PackageProtectionOrder" DROP COLUMN "orderAmount",
ADD COLUMN     "orderAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
DROP COLUMN "protectionFee",
ADD COLUMN     "protectionFee" DOUBLE PRECISION NOT NULL DEFAULT 0.00;
