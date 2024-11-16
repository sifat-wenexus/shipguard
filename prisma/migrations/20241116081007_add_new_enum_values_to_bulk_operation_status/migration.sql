/*
  Warnings:

  - The values [CANCELED,CENCELING] on the enum `BulkOperationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BulkOperationStatus_new" AS ENUM ('CANCELLED', 'CANCELING', 'COMPLETED', 'CREATED', 'EXPIRED', 'FAILED', 'RUNNING', 'SCHEDULED');
ALTER TABLE "BulkOperation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "BulkOperation" ALTER COLUMN "status" TYPE "BulkOperationStatus_new" USING ("status"::text::"BulkOperationStatus_new");
ALTER TYPE "BulkOperationStatus" RENAME TO "BulkOperationStatus_old";
ALTER TYPE "BulkOperationStatus_new" RENAME TO "BulkOperationStatus";
DROP TYPE "BulkOperationStatus_old";
ALTER TABLE "BulkOperation" ALTER COLUMN "status" SET DEFAULT 'CREATED';
COMMIT;
