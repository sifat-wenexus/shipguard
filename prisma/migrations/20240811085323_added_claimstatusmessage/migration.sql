/*
  Warnings:

  - A unique constraint covering the columns `[fulfillmentId]` on the table `PackageProtectionClaimOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PackageProtectionClaimOrder" ADD COLUMN     "claimStatusMessage" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PackageProtectionClaimOrder_fulfillmentId_key" ON "PackageProtectionClaimOrder"("fulfillmentId");
