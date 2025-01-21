/*
  Warnings:

  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CollectionToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_storeId_fkey";

-- DropForeignKey
ALTER TABLE "PackageProtection" DROP CONSTRAINT "PackageProtection_fixedProductId_fkey";

-- DropForeignKey
ALTER TABLE "PackageProtection" DROP CONSTRAINT "PackageProtection_percentageProductId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToProduct" DROP CONSTRAINT "_CollectionToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToProduct" DROP CONSTRAINT "_CollectionToProduct_B_fkey";

-- DropTable
DROP TABLE "_CollectionToProduct";

-- DropTable
DROP TABLE "ProductVariant";

-- DropTable
DROP TABLE "Product" ;

-- DropTable
DROP TABLE "Collection";
