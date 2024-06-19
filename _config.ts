// Check deno.json for import maps - this is where versions of modules are specified.
import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import prism from "lume/plugins/prism.ts";

/**
 * Import languages
 */
import "npm:prismjs/components/prism-sql.js";
import "npm:prismjs/components/prism-typescript.js";

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
    name: 'okaidia',
    path: "/_includes/css/code_theme.css"
  }
}));

export default site;
