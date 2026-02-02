import { getAllNews } from "./lib/getNews";
import { NewsList } from "./components/NewsList";

export default async function Home() {
  const news = await getAllNews();

  console.log("RSC Payload:", JSON.stringify(news));

  return (
    <main>
      <h1>Night City Official News</h1>
      <NewsList news={news} />
    </main>
  );
}
