SELECT column_name, column_type
FROM (
  DESCRIBE SELECT *
  FROM read_parquet(
    'https://cdn.statically.io/gh/economic-analytics/edd/main/data/parquet/LMS.parquet'
  )
);