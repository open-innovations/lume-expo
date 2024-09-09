// Check deno.json for import maps - this is where versions of modules are specified.
import lume from "lume/mod.ts";
import basePath from "lume/plugins/base_path.ts";
import favicon from "lume/plugins/favicon.ts";
import metas from "lume/plugins/metas.ts";
import postcss from "lume/plugins/postcss.ts";
import prism from "lume/plugins/prism.ts";

/**
 * Import languages
 */
import "npm:prismjs/components/prism-sql.js";
import "npm:prismjs/components/prism-typescript.js";

import { duckDbLoader, resultTable } from "jsr:@dringtech/lume-duck@0.2.0";

// Importing the OI Lume charts and utilities
import oiViz from "https://deno.land/x/oi_lume_viz@v0.16.0/mod.ts";
import autoDependency from "https://deno.land/x/oi_lume_utils@v0.4.0/processors/auto-dependency.ts";
import csvLoader from "https://deno.land/x/oi_lume_utils@v0.4.0/loaders/csv-loader.ts";
import jsonLoader from "lume/core/loaders/json.ts";

const site = lume({
  // Set the source directory
  src: "src",
  // Set the hosting location
  location: new URL("https://open-innovations.github.io/lume-expo"),
  components: {
    cssFile: "_includes/css/components.css",
  },
});
site.process([".html"], (pages) => pages.forEach(autoDependency));

site.loadData([".csv", ".tsv", ".dat"], csvLoader({ basic: true }));
site.loadData([".geojson"], jsonLoader);
site.loadData([".hexjson"], jsonLoader);

// Import lume viz
import oiVizConfig from "./oi-viz-config.ts";
site.use(oiViz(oiVizConfig));

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

/**
 * Set up the metas plugin for SEO.
 *
 * See https://lume.land/plugins/metas/#installation
 */
site.use(metas());

/**
 * The `base_path` plugin prefixes URLs in the generated site with a path derived from
 * the `location` setting confiured when the `site` object is created.
 *
 * See https://lume.land/plugins/base_path/
 */
site.use(basePath());

/**
 * The `favicon` plugin creates appropriate favicons from an SVG source.
 */
site.use(favicon({
  input: "/assets/images/oi-logo.svg",
}));

/**
 * Map some remote files into the build tree. These can be included or copied as needed
 */
site.remoteFile(
  "assets/images/oi-logo.svg",
  "https://open-innovations.org/resources/images/logos/oi-square-4.svg",
);

/**
 * Copy the asset folders over to the built site
 */
site.copy("assets/images/");
site.copy("assets/fonts/");

export default site;
