CREATE VIEW "ProductTag" AS
SELECT DISTINCT UNNEST(tags) as "tag", "storeId"
FROM "Product"
       join public."Store" S on S.id = "Product"."storeId";

CREATE VIEW "ProductType" AS
SELECT DISTINCT "productType", "storeId"
FROM "Product"
       join public."Store" S on S.id = "Product"."storeId";

CREATE VIEW "ProductVendor" AS
SELECT DISTINCT "vendor", "storeId"
FROM "Product"
       join public."Store" S on S.id = "Product"."storeId";

