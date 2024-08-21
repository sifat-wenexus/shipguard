-- CreateEnum
CREATE TYPE "ClaimStatus" AS ENUM ('REQUESTED', 'INPROGRESS', 'CANCEL', 'APPROVE', 'PARTIALLYAPPROVE');

-- AlterTable
ALTER TABLE "PackageProtectionOrder" ADD COLUMN     "claimStatus" "ClaimStatus" NOT NULL DEFAULT 'REQUESTED';
