/*
  Warnings:

  - You are about to drop the column `iconColor` on the `PackageProtection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackageProtection" DROP COLUMN "iconColor",
ADD COLUMN     "productId" TEXT,
ADD COLUMN     "switchColor" TEXT NOT NULL DEFAULT '#000000';
