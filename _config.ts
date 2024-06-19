// Check deno.json for import maps - this is where versions of modules are specified.
import lume from "lume/mod.ts";

const site = lume({
  // Set the source directory
  src: "src"
});

export default site;
