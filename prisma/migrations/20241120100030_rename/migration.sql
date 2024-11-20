/*
  Warnings:

  - You are about to drop the column `conndected` on the `GoogleAuthCredential` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GoogleAuthCredential" DROP COLUMN "conndected",
ADD COLUMN     "connected" BOOLEAN NOT NULL DEFAULT false;
