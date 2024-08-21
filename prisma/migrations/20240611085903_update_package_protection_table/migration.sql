-- AlterTable
ALTER TABLE "PackageProtection" ADD COLUMN     "cssSelector" TEXT,
ADD COLUMN     "defaultSetting" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "position" "ElementPlacementPosition" NOT NULL DEFAULT 'BEFORE';
