import Parser from "rss-parser";

export type VelogPost = {
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  tags: string[];
};

const parser = new Parser();

export async function fetchVelogPosts(): Promise<VelogPost[]> {
  const res = await fetch("https://v2.velog.io/rss/@z1won", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const xml = await res.text();
  const feed = await parser.parseString(xml);

  return feed.items.map((item) => ({
    title: item.title ?? "",
    summary: item.contentSnippet?.slice(0, 200) ?? "",
    url: item.link ?? "",
    publishedAt: item.isoDate
      ? new Date(item.isoDate).toISOString().split("T")[0]
      : "",
    tags: (item.categories as string[] | undefined) ?? [],
  }));
}
