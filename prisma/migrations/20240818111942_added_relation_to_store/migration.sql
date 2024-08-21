-- AlterTable
ALTER TABLE "PackageProtectionClaimOrder" ADD COLUMN     "storeId" TEXT NOT NULL DEFAULT 'gid://shopify/Shop/55079829551';

-- AddForeignKey
ALTER TABLE "PackageProtectionClaimOrder" ADD CONSTRAINT "PackageProtectionClaimOrder_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
