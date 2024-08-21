-- AlterTable
ALTER TABLE "PackageProtection" ADD COLUMN     "fixedProductId" TEXT,
ADD COLUMN     "percentageProductId" TEXT,
ALTER COLUMN "percentage" SET DEFAULT 0.25;
