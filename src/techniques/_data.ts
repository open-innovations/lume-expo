// Replace the url prefix with the grouping of the technique.
export const url = (page: Lume.Page) =>
  page.data.url.replace(/techniques/, page.data.technique);
