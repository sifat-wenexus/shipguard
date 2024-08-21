/*
  Warnings:

  - You are about to drop the column `refundAmount` on the `PackageProtectionClaimOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackageProtectionClaimOrder" DROP COLUMN "refundAmount",
ADD COLUMN     "fulfillClaim" BOOLEAN NOT NULL DEFAULT false;
