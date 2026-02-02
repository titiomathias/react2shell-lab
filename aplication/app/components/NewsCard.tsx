import Link from "next/link";

export function NewsCard({ news }: any) {
  return (
    <article>
      <h2>{news.title}</h2>
      <p>{news.summary}</p>
      <Link href={`/news/${news.slug}`}>Ler mais</Link>
    </article>
  );
}
