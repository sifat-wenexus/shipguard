/*
  Warnings:

  - Added the required column `email` to the `GmailAuthCredential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GmailAuthCredential" ADD COLUMN     "email" TEXT NOT NULL;
