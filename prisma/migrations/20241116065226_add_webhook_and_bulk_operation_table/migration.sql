/*
  Warnings:

  - The values [CANCELED,CENCELING] on the enum `BulkOperationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `JobBulkOperation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[bulkOperationId]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "JobBulkOperation" DROP CONSTRAINT "JobBulkOperation_jobId_fkey";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "bulkOperationId" INTEGER;

-- DropTable
DROP TABLE "JobBulkOperation";

-- CreateTable
CREATE TABLE "BulkOperation" (
    "id" SERIAL NOT NULL,
    "operationId" TEXT,
    "storeId" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "type" "BulkOperationType" NOT NULL DEFAULT 'MUTATION',
    "status" "BulkOperationStatus" NOT NULL DEFAULT 'CREATED',
    "query" TEXT NOT NULL,
    "variables" JSONB,
    "stagedUploadPath" TEXT,
    "fileSize" INTEGER,
    "url" TEXT,
    "partialDataUrl" TEXT,
    "objectCount" INTEGER NOT NULL DEFAULT 0,
    "rootObjectCount" INTEGER NOT NULL DEFAULT 0,
    "errorCode" "BulkOperationErrorCode",
    "error" JSONB,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMPTZ,

    CONSTRAINT "BulkOperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Webhook" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "objectId" TEXT,
    "topic" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_bulkOperationId_key" ON "Job"("bulkOperationId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_bulkOperationId_fkey" FOREIGN KEY ("bulkOperationId") REFERENCES "BulkOperation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulkOperation" ADD CONSTRAINT "BulkOperation_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
