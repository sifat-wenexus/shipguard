-- AlterTable
ALTER TABLE "PackageProtection" ADD COLUMN     "showOnCartPage" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showOnMiniCart" BOOLEAN NOT NULL DEFAULT false;
