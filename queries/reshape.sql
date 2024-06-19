PIVOT (
  SELECT
    f."dates.date" as period,
    f."variable.code" as variable,
    f.value as value
  FROM read_parquet(
    'https://cdn.statically.io/gh/economic-analytics/edd/main/data/parquet/LMS.parquet'
  ) f
  WHERE
    f."dates.freq" == 'm'
  AND
    f."dates.date" >= DATE '2020-01-01'
  AND
    f."variable.code" IN ('ZXDI', 'ZXDM', 'ZXDQ')
)
ON variable
USING sum(value)
ORDER BY period;
