-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "FullfillmentStatus" ADD VALUE 'IN_PROGRESS';
ALTER TYPE "FullfillmentStatus" ADD VALUE 'ON_HOLD';
ALTER TYPE "FullfillmentStatus" ADD VALUE 'OPEN';
ALTER TYPE "FullfillmentStatus" ADD VALUE 'PENDING_FULFILLMENT';
ALTER TYPE "FullfillmentStatus" ADD VALUE 'REQUEST_DECLINED';
ALTER TYPE "FullfillmentStatus" ADD VALUE 'RESTOCKED';
ALTER TYPE "FullfillmentStatus" ADD VALUE 'SCHEDULED';
