/*
  Warnings:

  - You are about to drop the column `productTitle` on the `ExcludedPackageProtectionProduct` table. All the data in the column will be lost.
  - Added the required column `storeId` to the `ExcludedPackageProtectionProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalInventory` to the `ExcludedPackageProtectionProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalVariants` to the `ExcludedPackageProtectionProduct` table without a default value. This is not possible if the table is not empty.
  - Made the column `productId` on table `ExcludedPackageProtectionVariant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ExcludedPackageProtectionProduct" DROP CONSTRAINT "ExcludedPackageProtectionProduct_id_fkey";

-- DropForeignKey
ALTER TABLE "ExcludedPackageProtectionVariant" DROP CONSTRAINT "ExcludedPackageProtectionVariant_id_fkey";

-- AlterTable
ALTER TABLE "ExcludedPackageProtectionProduct" DROP COLUMN "productTitle",
ADD COLUMN     "productType" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "storeId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "totalInventory" INTEGER NOT NULL,
ADD COLUMN     "totalVariants" INTEGER NOT NULL,
ADD COLUMN     "vendor" TEXT;

-- AlterTable
ALTER TABLE "ExcludedPackageProtectionVariant" ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ExcludedPackageProtectionProduct" ADD CONSTRAINT "ExcludedPackageProtectionProduct_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "PackageProtection"("storeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcludedPackageProtectionVariant" ADD CONSTRAINT "ExcludedPackageProtectionVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ExcludedPackageProtectionProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
