/*
  Warnings:

  - Made the column `name` on table `EmailTemplate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EmailTemplate" ALTER COLUMN "name" SET NOT NULL;
