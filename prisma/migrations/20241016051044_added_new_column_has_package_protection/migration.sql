/*
  Warnings:

  - Added the required column `hasPackageProtection` to the `PackageProtectionOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PackageProtectionOrder" ADD COLUMN     "hasPackageProtection" BOOLEAN NOT NULL;
