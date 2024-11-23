/*
  Warnings:

  - The primary key for the `GoogleAuthCredential` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `GoogleAuthCredential` table. All the data in the column will be lost.
  - You are about to drop the column `oauthState` on the `GoogleAuthCredential` table. All the data in the column will be lost.
  - The `id` column on the `GoogleAuthCredential` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `storeId` to the `GoogleAuthCredential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `GoogleAuthCredential` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GoogleAuthCredential" DROP CONSTRAINT "GoogleAuthCredential_id_fkey";

-- AlterTable
ALTER TABLE "GoogleAuthCredential" DROP CONSTRAINT "GoogleAuthCredential_pkey",
DROP COLUMN "email",
DROP COLUMN "oauthState",
ADD COLUMN     "storeId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "GoogleAuthCredential_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "GoogleOAuthState" (
    "id" SERIAL NOT NULL,
    "storeId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GoogleOAuthState_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoogleAuthCredential" ADD CONSTRAINT "GoogleAuthCredential_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoogleOAuthState" ADD CONSTRAINT "GoogleOAuthState_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
