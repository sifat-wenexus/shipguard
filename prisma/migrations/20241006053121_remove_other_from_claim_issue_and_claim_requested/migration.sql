/*
  Warnings:

  - The values [OTHER_ISSUE] on the enum `ClaimIssue` will be removed. If these variants are still used in the database, this will fail.
  - The values [OTHERS] on the enum `ClaimRequested` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ClaimIssue_new" AS ENUM ('DAMAGED', 'STOLLEN', 'LOST');
ALTER TABLE "PackageProtectionClaimOrder" ALTER COLUMN "issue" TYPE "ClaimIssue_new" USING ("issue"::text::"ClaimIssue_new");
ALTER TYPE "ClaimIssue" RENAME TO "ClaimIssue_old";
ALTER TYPE "ClaimIssue_new" RENAME TO "ClaimIssue";
DROP TYPE "ClaimIssue_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ClaimRequested_new" AS ENUM ('RESHIP', 'REFUND');
ALTER TABLE "PackageProtectionClaimOrder" ALTER COLUMN "requestedResulation" TYPE "ClaimRequested_new" USING ("requestedResulation"::text::"ClaimRequested_new");
ALTER TYPE "ClaimRequested" RENAME TO "ClaimRequested_old";
ALTER TYPE "ClaimRequested_new" RENAME TO "ClaimRequested";
DROP TYPE "ClaimRequested_old";
COMMIT;
