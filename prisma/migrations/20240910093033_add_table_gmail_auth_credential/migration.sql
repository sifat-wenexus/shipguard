-- CreateTable
CREATE TABLE "GmailAuthCredential" (
    "id" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GmailAuthCredential_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GmailAuthCredential" ADD CONSTRAINT "GmailAuthCredential_id_fkey" FOREIGN KEY ("id") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
