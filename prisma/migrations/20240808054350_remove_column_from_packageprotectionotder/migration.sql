/*
  Warnings:

  - You are about to drop the column `claimStatus` on the `PackageProtectionOrder` table. All the data in the column will be lost.
  - You are about to drop the column `comments` on the `PackageProtectionOrder` table. All the data in the column will be lost.
  - You are about to drop the column `hasClaimRequest` on the `PackageProtectionOrder` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `PackageProtectionOrder` table. All the data in the column will be lost.
  - Added the required column `fulfillmentLineItemId` to the `PackageProtectionClaimOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PackageProtectionClaimOrder" ADD COLUMN     "fulfillmentLineItemId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PackageProtectionOrder" DROP COLUMN "claimStatus",
DROP COLUMN "comments",
DROP COLUMN "hasClaimRequest",
DROP COLUMN "images";
