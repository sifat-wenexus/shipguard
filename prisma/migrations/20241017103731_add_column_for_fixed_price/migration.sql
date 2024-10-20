-- AlterEnum
ALTER TYPE "InsurancePricingType" ADD VALUE 'FIXED_MULTIPLE';

-- AlterTable
ALTER TABLE "PackageProtection" ADD COLUMN     "fixedMultiplePlan" JSONB,
ADD COLUMN     "isSingle" BOOLEAN NOT NULL DEFAULT true;
