/*
  Warnings:

  - You are about to drop the column `authType` on the `SmtpSetting` table. All the data in the column will be lost.
  - You are about to drop the column `callbackUrl` on the `SmtpSetting` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `SmtpSetting` table. All the data in the column will be lost.
  - You are about to drop the column `clientSecret` on the `SmtpSetting` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `SmtpSetting` table. All the data in the column will be lost.
  - You are about to drop the column `tokenUrl` on the `SmtpSetting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SmtpSetting" DROP COLUMN "authType",
DROP COLUMN "callbackUrl",
DROP COLUMN "clientId",
DROP COLUMN "clientSecret",
DROP COLUMN "scope",
DROP COLUMN "tokenUrl",
ADD COLUMN     "protocol" TEXT;
