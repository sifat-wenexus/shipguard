-- CreateEnum
CREATE TYPE "BulkOperationType" AS ENUM ('MUTATION', 'QUERY');

-- CreateEnum
CREATE TYPE "BulkOperationStatus" AS ENUM ('CANCELED', 'CENCELING', 'COMPLETED', 'CREATED', 'EXPIRED', 'FAILED', 'RUNNING');

-- CreateEnum
CREATE TYPE "BulkOperationErrorCode" AS ENUM ('ACCESS_DENIED', 'INTERNAL_SERVER_ERROR', 'TIMEOUT');

-- AlterEnum
ALTER TYPE "JobExecutionStatus" ADD VALUE 'PAUSED';

-- AlterTable
ALTER TABLE "JobExecution" ADD COLUMN     "currentStep" TEXT NOT NULL DEFAULT 'execute',
ADD COLUMN     "prevStep" TEXT;

-- CreateTable
CREATE TABLE "JobBulkOperation" (
    "id" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobBulkOperation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobBulkOperation_jobId_idx" ON "JobBulkOperation"("jobId");

-- AddForeignKey
ALTER TABLE "JobBulkOperation" ADD CONSTRAINT "JobBulkOperation_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
