/*
  Warnings:

  - You are about to drop the column `billingAddress` on the `PackageProtectionOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackageProtectionOrder" DROP COLUMN "billingAddress",
ADD COLUMN     "shippingAddress" JSONB;
