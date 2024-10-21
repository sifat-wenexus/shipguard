/*
  Warnings:

  - The `insurancePriceType` column on the `PackageProtection` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "IinsurancePricingType" AS ENUM ('PERCENTAGE', 'FIXED_PRICE', 'FIXED_MULTIPLE', 'NOT_SELECTED');

-- AlterTable
ALTER TABLE "PackageProtection" DROP COLUMN "insurancePriceType",
ADD COLUMN     "insurancePriceType" "IinsurancePricingType" NOT NULL DEFAULT 'NOT_SELECTED';

-- DropEnum
DROP TYPE "InsurancePricingType";
