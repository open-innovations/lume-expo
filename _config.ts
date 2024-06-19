// Check deno.json for import maps - this is where versions of modules are specified.
import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import prism from "lume/plugins/prism.ts";

/**
 * Import languages
 */
import "npm:prismjs/components/prism-sql.js";
import "npm:prismjs/components/prism-typescript.js";

import { duckDbLoader, resultTable } from "jsr:@dringtech/lume-duck@0.1.2";

const site = lume({
  // Set the source directory
  src: "src",
});

/**
 * Setup postcss processor
 */
site.use(postcss());

/**
 * Setup code highlighting
 */
site.use(prism({
  theme: {
    name: "okaidia",
    path: "/_includes/css/code_theme.css",
  },
}));

/**
 * To get the DuckDB Loader to work you need to install the DuckDB library.
 * Deno also needs to be run with the --unstable-ffi flag.
 */
site.loadData(
  [".sql"],
  duckDbLoader({
    dbPath: ":memory:",
  }),
);
site.filter("resultTable", resultTable);

export default site;
