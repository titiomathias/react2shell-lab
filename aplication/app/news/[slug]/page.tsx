import { getNewsBySlug } from "../../lib/getNews";

export default async function NewsPage({ params }: any) {
  const { slug } = await params;

  const news = await getNewsBySlug(slug);

  if (!news) {
    return <h1>Notícia não encontrada</h1>;
  }

  return (
    <article>
      <h1>{news.title}</h1>
      <p>{news.content}</p>
    </article>
  );
}

