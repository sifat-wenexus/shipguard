/*
  Warnings:

  - You are about to drop the column `orderDate` on the `PackageProtectionClaimOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackageProtectionClaimOrder" DROP COLUMN "orderDate";

-- AlterTable
ALTER TABLE "PackageProtectionOrder" ADD COLUMN     "orderDate" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;
