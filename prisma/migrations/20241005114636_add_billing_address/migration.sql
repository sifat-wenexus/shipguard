/*
  Warnings:

  - The `customerAddress` column on the `PackageProtectionOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PackageProtectionOrder" ADD COLUMN     "billingAddress" JSONB,
DROP COLUMN "customerAddress",
ADD COLUMN     "customerAddress" JSONB;
