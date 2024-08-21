-- CreateTable
CREATE TABLE "PackageProtectionOrder" (
    "storeId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "orderName" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "PackageProtectionOrder_pkey" PRIMARY KEY ("storeId")
);

-- AddForeignKey
ALTER TABLE "PackageProtectionOrder" ADD CONSTRAINT "PackageProtectionOrder_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
