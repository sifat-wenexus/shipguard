/*
  Warnings:

  - You are about to drop the column `billingAddress` on the `PackageProtectionOrder` table. All the data in the column will be lost.
  - You are about to drop the column `customerAddress` on the `PackageProtectionOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackageProtectionOrder" DROP COLUMN "billingAddress",
DROP COLUMN "customerAddress";
