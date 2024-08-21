-- AlterTable
CREATE SEQUENCE salescampaignexclude_id_seq;
ALTER TABLE "SalesCampaignExclude" ALTER COLUMN "id" SET DEFAULT nextval('salescampaignexclude_id_seq');
ALTER SEQUENCE salescampaignexclude_id_seq OWNED BY "SalesCampaignExclude"."id";

-- AlterTable
CREATE SEQUENCE salescampaigninclude_id_seq;
ALTER TABLE "SalesCampaignInclude" ALTER COLUMN "id" SET DEFAULT nextval('salescampaigninclude_id_seq');
ALTER SEQUENCE salescampaigninclude_id_seq OWNED BY "SalesCampaignInclude"."id";
