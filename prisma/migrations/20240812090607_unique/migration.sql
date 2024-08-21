/*
  Warnings:

  - A unique constraint covering the columns `[fulfillmentLineItemId]` on the table `PackageProtectionClaimOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PackageProtectionClaimOrder_fulfillmentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "PackageProtectionClaimOrder_fulfillmentLineItemId_key" ON "PackageProtectionClaimOrder"("fulfillmentLineItemId");
