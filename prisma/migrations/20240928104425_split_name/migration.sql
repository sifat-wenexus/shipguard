/*
  Warnings:

  - You are about to drop the column `customerName` on the `PackageProtectionOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackageProtectionOrder" DROP COLUMN "customerName",
ADD COLUMN     "customerFirstName" TEXT,
ADD COLUMN     "customerLastName" TEXT;
