import { news } from "../data/news";

export async function getAllNews() {
  console.log("Fetching news on SERVER");

  await new Promise((r) => setTimeout(r, 1500));

  return news;
}

export async function getNewsBySlug(slug: string) {
  await new Promise((r) => setTimeout(r, 1000));
  return news.find((n) => n.slug === slug);
}
