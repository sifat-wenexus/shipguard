/*
  Warnings:

  - Added the required column `fulfillmentId` to the `PackageProtectionClaimOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PackageProtectionClaimOrder" ADD COLUMN     "fulfillmentId" TEXT NOT NULL;
