PIVOT (
  SELECT
    f."dates.date" as date,
    f."variable.name" as variable_name,
    f.value as value
  FROM read_parquet(
    'https://cdn.statically.io/gh/economic-analytics/edd/main/data/parquet/LMS.parquet'
  ) f
  WHERE
    f."dates.freq" == 'm'
  AND
    f."dates.date" >= DATE '2010-01-01'
  AND
    f."variable.code" IN ('JP9H', 'JP9I', 'JP9J', 'JP9L')
)
ON variable_name
USING sum(value)
ORDER BY date;