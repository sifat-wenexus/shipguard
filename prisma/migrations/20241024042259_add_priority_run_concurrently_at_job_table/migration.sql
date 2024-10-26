-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "runConcurrently" BOOLEAN NOT NULL DEFAULT false;
