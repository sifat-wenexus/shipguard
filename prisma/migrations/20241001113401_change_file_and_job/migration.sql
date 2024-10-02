/*
  Warnings:

  - The values [CREATED,COMPLETED,CANCELLED] on the enum `JobStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `progress` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `result` on the `Job` table. All the data in the column will be lost.
  - Added the required column `node` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobExecutionStatus" AS ENUM ('SUCCEEDED', 'CANCELLED', 'RUNNING', 'FAILED');

-- AlterEnum
BEGIN;
CREATE TYPE "JobStatus_new" AS ENUM ('SCHEDULED', 'FINISHED', 'FAILED', 'PENDING', 'RUNNING', 'PAUSED');
ALTER TABLE "Job" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "status" TYPE "JobStatus_new" USING ("status"::text::"JobStatus_new");
ALTER TYPE "JobStatus" RENAME TO "JobStatus_old";
ALTER TYPE "JobStatus_new" RENAME TO "JobStatus";
DROP TYPE "JobStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "progress",
DROP COLUMN "result",
ADD COLUMN     "executedAt" TIMESTAMPTZ,
ADD COLUMN     "interval" INTEGER,
ADD COLUMN     "maxRetries" INTEGER,
ADD COLUMN     "node" TEXT NOT NULL,
ADD COLUMN     "scheduledAt" TIMESTAMPTZ,
ADD COLUMN     "tries" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "storeId" DROP NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- CreateTable
CREATE TABLE "JobExecution" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "status" "JobExecutionStatus" NOT NULL,
    "result" JSONB,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "JobExecution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobExecution_jobId_idx" ON "JobExecution"("jobId");

-- CreateIndex
CREATE INDEX "JobExecution_status_idx" ON "JobExecution"("status");

-- CreateIndex
CREATE INDEX "Job_executedAt_idx" ON "Job" USING BRIN ("executedAt");

-- AddForeignKey
ALTER TABLE "JobExecution" ADD CONSTRAINT "JobExecution_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
