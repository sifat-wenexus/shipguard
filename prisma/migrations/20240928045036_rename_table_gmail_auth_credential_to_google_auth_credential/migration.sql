/*
  Warnings:

  - You are about to drop the `GmailAuthCredential` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GmailAuthCredential" DROP CONSTRAINT "GmailAuthCredential_id_fkey";

-- DropTable
DROP TABLE "GmailAuthCredential";

-- CreateTable
CREATE TABLE "GoogleAuthCredential" (
    "id" TEXT NOT NULL,
    "oauthState" TEXT NOT NULL,
    "payload" JSONB,
    "email" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GoogleAuthCredential_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoogleAuthCredential" ADD CONSTRAINT "GoogleAuthCredential_id_fkey" FOREIGN KEY ("id") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
