-- CreateEnum
CREATE TYPE "ClaimIssue" AS ENUM ('DAMAGED', 'STOLLEN', 'LOST', 'OTHER_ISSUE');

-- CreateEnum
CREATE TYPE "ClaimRequested" AS ENUM ('RESHIP', 'REFUND', 'OTHERS');

-- AlterTable
ALTER TABLE "PackageProtectionOrder" ADD COLUMN     "issue" "ClaimIssue",
ADD COLUMN     "requestedResulation" "ClaimRequested";
