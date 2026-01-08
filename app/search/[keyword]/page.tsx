import SearchClient from "./SearchClient";

type Props = {
  params: { keyword: string };
};

export default function SearchPage({ params }: Props) {
  return <SearchClient keyword={params.keyword} />;
}
