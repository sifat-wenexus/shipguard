-- AlterTable
ALTER TABLE "PackageProtectionOrder" ALTER COLUMN "claimStatus" DROP NOT NULL,
ALTER COLUMN "claimStatus" DROP DEFAULT;
