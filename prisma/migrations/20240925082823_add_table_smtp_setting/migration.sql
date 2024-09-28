-- AlterTable
ALTER TABLE "PackageProtection" ALTER COLUMN "percentage" SET DEFAULT 0,
ALTER COLUMN "icon" SET DEFAULT 'three';

-- CreateTable
CREATE TABLE "SmtpSetting" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "from" TEXT,
    "host" TEXT,
    "port" INTEGER,
    "tlsVersion" TEXT,
    "timeout" INTEGER NOT NULL DEFAULT 10000,
    "useProxy" BOOLEAN NOT NULL DEFAULT false,
    "proxyHost" TEXT,
    "proxyPort" INTEGER,
    "proxyUsername" TEXT,
    "proxyPassword" TEXT,
    "authType" TEXT,
    "username" TEXT,
    "password" TEXT,
    "clientId" TEXT,
    "clientSecret" TEXT,
    "callbackUrl" TEXT,
    "tokenUrl" TEXT,
    "scope" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SmtpSetting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SmtpSetting" ADD CONSTRAINT "SmtpSetting_id_fkey" FOREIGN KEY ("id") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
