/*
  Warnings:

  - You are about to drop the column `shippingAddress` on the `PackageProtectionOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackageProtectionOrder" DROP COLUMN "shippingAddress",
ADD COLUMN     "billingAddress" JSONB;
