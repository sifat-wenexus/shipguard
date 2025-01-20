-- AlterTable
ALTER TABLE "JobExecution" RENAME COLUMN "currentStep" TO "step";
ALTER TABLE "JobExecution" DROP COLUMN "prevStep";
