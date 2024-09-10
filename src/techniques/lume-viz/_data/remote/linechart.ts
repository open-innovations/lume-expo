import { open } from "jsr:@divy/duckdb";

const db = open(":memory:");

const decoder = new TextDecoder("utf-8");
const sql = decoder.decode(await Deno.readFile("queries/line-chart.sql"));

export default function () {
  const connection = db.connect();
  const res = connection.query(sql);
  connection.close();
  return res;
}
