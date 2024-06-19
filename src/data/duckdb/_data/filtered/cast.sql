SELECT
id, name
FROM read_csv(
  'data/sample.csv',
  columns = {
    'id': 'INTEGER',
    'name': 'VARCHAR'
  }
)
WHERE id <= ?;