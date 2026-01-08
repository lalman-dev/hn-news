import CategoryClient from "./CategoryClient";
import { fetchHN } from "../lib/hnApi";

type Hit = {
  objectID: string;
  title: string;
  points?: number;
  author?: string;
  num_comments?: number;
};

type HNResponse<T> = {
  hits: T[];
};

type Props = {
  params: { category: string };
};

export default async function CategoryPage({ params }: Props) {
  const { category } = params;

  const res = await fetchHN<HNResponse<Hit>>(
    `https://hn.algolia.com/api/v1/search?query=${category}&tags=story`
  );

  if (!res?.hits) {
    throw new Error(`Failed to load ${category} news`);
  }

  return <CategoryClient category={category} results={res.hits} />;
}
