import { NewsCard } from "./NewsCard";

export function NewsList({ news }: any) {
  return (
    <section>
      {news.map((n: any) => (
        <NewsCard key={n.id} news={n} />
      ))}
    </section>
  );
}
