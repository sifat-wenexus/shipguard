-- CreateEnum
CREATE TYPE "InsurancePricingType" AS ENUM ('PERCENTAGE', 'FIXED_PRICE');

-- AlterTable
ALTER TABLE "ScrollToTopSettings" ADD COLUMN     "bottom" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "right" INTEGER NOT NULL DEFAULT 10;

-- CreateTable
CREATE TABLE "PackageProtection" (
    "storeId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "insurancePriceType" "InsurancePricingType" NOT NULL DEFAULT 'PERCENTAGE',
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "icon" TEXT NOT NULL DEFAULT 'one',
    "iconColor" TEXT NOT NULL DEFAULT '#000000',
    "title" TEXT,
    "enabledDescription" TEXT,
    "disabledDescription" TEXT,
    "policyUrl" TEXT,
    "insuranceDisplayButton" BOOLEAN NOT NULL DEFAULT false,
    "insuranceFulfillmentStatus" TEXT,
    "css" TEXT,

    CONSTRAINT "PackageProtection_pkey" PRIMARY KEY ("storeId")
);

-- CreateTable
CREATE TABLE "ExcludedPackageProtectionVariant" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,

    CONSTRAINT "ExcludedPackageProtectionVariant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PackageProtection" ADD CONSTRAINT "PackageProtection_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcludedPackageProtectionVariant" ADD CONSTRAINT "ExcludedPackageProtectionVariant_id_fkey" FOREIGN KEY ("id") REFERENCES "PackageProtection"("storeId") ON DELETE CASCADE ON UPDATE CASCADE;
