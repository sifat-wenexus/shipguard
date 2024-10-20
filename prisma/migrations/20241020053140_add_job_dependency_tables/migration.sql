-- AlterEnum
ALTER TYPE "JobStatus" ADD VALUE 'CANCELLED';

-- CreateTable
CREATE TABLE "JobDependency" (
    "jobId" INTEGER NOT NULL,
    "dependsOnId" INTEGER NOT NULL,

    CONSTRAINT "JobDependency_pkey" PRIMARY KEY ("jobId","dependsOnId")
);

-- AddForeignKey
ALTER TABLE "JobDependency" ADD CONSTRAINT "JobDependency_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobDependency" ADD CONSTRAINT "JobDependency_dependsOnId_fkey" FOREIGN KEY ("dependsOnId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
