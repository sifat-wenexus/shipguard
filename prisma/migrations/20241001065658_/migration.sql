/*
  Warnings:

  - The primary key for the `EmailTemplate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EmailTemplate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmailTemplate" DROP CONSTRAINT "EmailTemplate_storeId_fkey";

-- AlterTable
ALTER TABLE "EmailTemplate" DROP CONSTRAINT "EmailTemplate_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("storeId", "name");

-- AddForeignKey
ALTER TABLE "EmailTemplate" ADD CONSTRAINT "EmailTemplate_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
