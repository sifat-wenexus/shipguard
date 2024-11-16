/*
  Warnings:

  - Made the column `startDate` on table `SalesCampaign` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "ContentStatus" ADD VALUE 'PENDING';

-- AlterTable
ALTER TABLE "SalesCampaign" ALTER COLUMN "startDate" SET NOT NULL;
