/**
 * A generator which creates a page per technique in use.
 *
 * @param pageData Lume page data
 */
export default function* ({ search, techniques }: Lume.Data & {
  techniques: Technique[];
}) {
  // Find all values of technique in use
  const keys = search.values<string>("technique");

  for (const key of keys) {
    // Search for the technique in the techniques site data (see /src/_data.yml)
    const technique = techniques.find((t) => t.key === key);
    if (!technique) {
      throw new Error(`Technique ${key} not defined in _data.yml`);
    }

    // Find the technique list position
    const order = techniques.indexOf(technique);

    // Find all pages that have this technique key set
    // Sort by title
    const pages = search.pages(`technique=${key}`, "title").map(
      ({ title, url }) => ({ title, url }),
    );

    // Yield the page data for this page.
    // This will be used in the layout defined below to create the page.
    // `order` is used for lists of the content
    yield {
      ...technique,
      order,
      url: `/${key}/`,
      catalogue: pages,
    };
  }
}

/**
 * Definition of a technique entry
 */
type Technique = { key: string; title: string };

/**
 * All pages created by this generator will use the catalogue layout
 */
export const layout = "layout/catalogue.vto";

/**
 * All pages created by this generator will be tagged `technique`
 */
export const tags = ["technique"];
