-- CreateEnum
CREATE TYPE "ElementPlacementPosition" AS ENUM ('INSIDE_BEGIN', 'INSIDE_END', 'REPLACE', 'BEFORE', 'AFTER');

-- CreateEnum
CREATE TYPE "TextAlignment" AS ENUM ('CENTER', 'RIGHT', 'LEFT');

-- CreateTable
CREATE TABLE "CheckoutTermsSettings" (
    "storeId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "text" TEXT,
    "warningText" TEXT,
    "position" "ElementPlacementPosition" NOT NULL DEFAULT 'AFTER',
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "textFontSize" TEXT NOT NULL DEFAULT '14px',
    "textColor" TEXT NOT NULL DEFAULT '#000000',
    "textLinkColor" TEXT NOT NULL DEFAULT '#115ccf',
    "textLinkUnderline" BOOLEAN NOT NULL DEFAULT false,
    "warningTextFontSize" TEXT NOT NULL DEFAULT '14px',
    "warningTextColor" TEXT NOT NULL DEFAULT '#ff0000',
    "warningTextLinkColor" TEXT NOT NULL DEFAULT '#115ccf',
    "warningTextLinkUnderline" BOOLEAN NOT NULL DEFAULT false,
    "showOnCartPage" BOOLEAN NOT NULL DEFAULT false,
    "showOnMiniCart" BOOLEAN NOT NULL DEFAULT false,
    "textAlign" "TextAlignment" NOT NULL DEFAULT 'LEFT',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "CheckoutTermsSettings_pkey" PRIMARY KEY ("storeId")
);

-- AddForeignKey
ALTER TABLE "CheckoutTermsSettings" ADD CONSTRAINT "CheckoutTermsSettings_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
