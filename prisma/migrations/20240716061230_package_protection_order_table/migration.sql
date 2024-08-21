/*
  Warnings:

  - The primary key for the `PackageProtectionOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[orderId]` on the table `PackageProtectionOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "FullfillmentStatus" AS ENUM ('UNFULFILLED', 'FULFILLED', 'PARTIALLY_FULFILLED');

-- AlterTable
ALTER TABLE "PackageProtectionOrder" DROP CONSTRAINT "PackageProtectionOrder_pkey",
ADD COLUMN     "fulfillmentStatus" "FullfillmentStatus" NOT NULL DEFAULT 'UNFULFILLED',
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "orderAmount" TEXT NOT NULL DEFAULT '00',
ADD COLUMN     "protectionFee" TEXT NOT NULL DEFAULT '00',
ADD CONSTRAINT "PackageProtectionOrder_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PackageProtectionOrder_orderId_key" ON "PackageProtectionOrder"("orderId");
