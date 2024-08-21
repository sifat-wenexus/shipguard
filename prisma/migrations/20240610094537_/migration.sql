/*
  Warnings:

  - You are about to drop the column `productId` on the `PackageProtection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackageProtection" DROP COLUMN "productId";

-- AddForeignKey
ALTER TABLE "PackageProtection" ADD CONSTRAINT "PackageProtection_fixedProductId_fkey" FOREIGN KEY ("fixedProductId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageProtection" ADD CONSTRAINT "PackageProtection_percentageProductId_fkey" FOREIGN KEY ("percentageProductId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
