/*
  Warnings:

  - You are about to drop the `Migration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Migration" DROP CONSTRAINT "Migration_storeId_fkey";

-- DropTable
DROP TABLE "Migration";

-- CreateTable
CREATE TABLE "App" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "url" TEXT NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);
