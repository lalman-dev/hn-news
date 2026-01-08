import HomeClient from "./HomeClient";
import { fetchHN } from "./lib/hnApi";

type Story = {
  objectID: string;
  title: string;
  points?: number;
  author?: string;
  num_comments?: number;
};

type HNResponse<T> = {
  hits: T[];
};

export default async function HomePage() {
  const res = await fetchHN<HNResponse<Story>>(
    "https://hn.algolia.com/api/v1/search?tags=front_page"
  );

  if (!res?.hits) {
    throw new Error("Failed to fetch trending stories");
  }

  return <HomeClient stories={res.hits} />;
}
