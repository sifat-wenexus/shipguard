/*
  Warnings:

  - The primary key for the `PackageProtectionClaimOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PackageProtectionClaimOrder` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `orderId` to the `PackageProtectionClaimOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PackageProtectionClaimOrder" DROP CONSTRAINT "PackageProtectionClaimOrder_id_fkey";

-- AlterTable
ALTER TABLE "PackageProtectionClaimOrder" DROP CONSTRAINT "PackageProtectionClaimOrder_pkey",
ADD COLUMN     "orderId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PackageProtectionClaimOrder_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "PackageProtectionClaimOrder" ADD CONSTRAINT "PackageProtectionClaimOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PackageProtectionOrder"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;
