CREATE MATERIALIZED VIEW "TimezoneSimplified" AS
SELECT O.id,
       CASE
         WHEN O."gmtOffset" = 'UTC' THEN 'UTC'
         ELSE replace(O."gmtOffset", 'UTC', 'GMT')
         END as "gmtOffset",
       O."countries"
FROM (SELECT DISTINCT TZ."gmtOffset",
                      (SELECT TX.id FROM "Timezone" TX WHERE TX."gmtOffset" = TZ."gmtOffset" LIMIT 1) AS "id",
                      array_to_string(ARRAY((SELECT DISTINCT CI."name"
                                             FROM "Country" CI
                                                    JOIN public."Timezone" TI on CI.id = TI."countryId"
                                             WHERE TI."gmtOffset" = TZ."gmtOffset"
                                             ORDER BY CI."name")), ', ')                              AS countries
      from "Timezone" TZ) O;
