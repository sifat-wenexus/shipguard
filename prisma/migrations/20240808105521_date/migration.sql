-- AlterTable
ALTER TABLE "PackageProtectionOrder" ADD COLUMN     "claimDate" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;
