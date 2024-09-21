/*
  Warnings:

  - Added the required column `customerId` to the `PackageProtectionOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PackageProtectionOrder" ADD COLUMN     "customerId" TEXT;
