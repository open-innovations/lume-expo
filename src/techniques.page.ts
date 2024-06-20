export const layout = "layout/catalogue.vto";

export const tags = ["technique"];

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function* ({ search }: Lume.Data) {
  const techniques = search.values<string>("technique");

  for (const technique of techniques) {
    const pages = search.pages(`technique=${technique}`).map(
      ({ title, url }) => ({ title, url }),
    );
    yield {
      title: capitalise(technique),
      url: `/${technique}/`,
      catalogue: pages,
    };
  }
}
