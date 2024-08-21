/*
  Warnings:

  - You are about to drop the column `variantId` on the `ExcludedPackageProtectionVariant` table. All the data in the column will be lost.
  - Added the required column `inventoryQuantity` to the `ExcludedPackageProtectionVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ExcludedPackageProtectionVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExcludedPackageProtectionVariant" DROP CONSTRAINT "ExcludedPackageProtectionVariant_id_fkey";

-- AlterTable
ALTER TABLE "ExcludedPackageProtectionVariant" DROP COLUMN "variantId",
ADD COLUMN     "availableForSale" BOOLEAN,
ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "compareAtPrice" DOUBLE PRECISION,
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "inventoryManagement" TEXT,
ADD COLUMN     "inventoryPolicy" TEXT,
ADD COLUMN     "inventoryQuantity" INTEGER NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT,
ADD COLUMN     "selectedOptions" JSONB[],
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "ExcludedPackageProtectionProduct" (
    "id" TEXT NOT NULL,
    "productTitle" TEXT,
    "productId" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "ExcludedPackageProtectionProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExcludedPackageProtectionProduct" ADD CONSTRAINT "ExcludedPackageProtectionProduct_id_fkey" FOREIGN KEY ("id") REFERENCES "PackageProtection"("storeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcludedPackageProtectionVariant" ADD CONSTRAINT "ExcludedPackageProtectionVariant_id_fkey" FOREIGN KEY ("id") REFERENCES "ExcludedPackageProtectionProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
