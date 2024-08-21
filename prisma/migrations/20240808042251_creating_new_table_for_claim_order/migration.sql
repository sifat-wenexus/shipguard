/*
  Warnings:

  - You are about to drop the column `issue` on the `PackageProtectionOrder` table. All the data in the column will be lost.
  - You are about to drop the column `requestedResulation` on the `PackageProtectionOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackageProtectionOrder" DROP COLUMN "issue",
DROP COLUMN "requestedResulation";

-- CreateTable
CREATE TABLE "PackageProtectionClaimOrder" (
    "id" TEXT NOT NULL,
    "issue" "ClaimIssue",
    "requestedResulation" "ClaimRequested",
    "hasClaimRequest" BOOLEAN NOT NULL DEFAULT false,
    "claimStatus" "ClaimStatus",
    "comments" TEXT,
    "images" TEXT,

    CONSTRAINT "PackageProtectionClaimOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PackageProtectionClaimOrder" ADD CONSTRAINT "PackageProtectionClaimOrder_id_fkey" FOREIGN KEY ("id") REFERENCES "PackageProtectionOrder"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;
