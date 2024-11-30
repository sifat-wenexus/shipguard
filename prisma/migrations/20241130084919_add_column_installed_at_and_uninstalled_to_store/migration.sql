/*
  Warnings:

  - You are about to drop the column `theme` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `themeVersion` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store"
ADD COLUMN     "installedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "uninstalledAt" TIMESTAMPTZ;
