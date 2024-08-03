import Header from "@/src/components/Header";
import { getSearchResult } from "@/src/app/functions/fetch";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}): Promise<Metadata> {
  const query = searchParams?.q ?? "";
  return {
    title: "Search Results for " + query,
    description: "Watch Movies and TV Shows Related to " + "'" + query + "'",
    openGraph: {
      type: "website",
      url: `https://thefloxtv.com/search?q=${query}`,
      title: "Search Results for " + query,
    },
  };
}

export default async function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const search_query = searchParams?.q ?? " ";
  const search_result = await getSearchResult(search_query);
  return (
    <>
      <Header page="search" />
      <main className="w-full p-7 sm:p-4">
        <p className="mb-5">Search Results for {search_query} :</p>
        <div className="w-full grid grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {search_result.map((result: any) => (
            <Link
              key={result.id}
              href={
                result.media_type == "movie"
                  ? `/movies/${result.id}`
                  : `/tv/${result.id}`
              }
            >
              <div className="w-full h-auto overflow-hidden">
                <Image
                  unoptimized
                  className="w-full rounded-lg object-cover"
                  src={`https://image.tmdb.org/t/p/w220_and_h330_face${
                    result.media_type == "movie"
                      ? result.poster_path
                      : result.poster_path
                  }`}
                  alt=""
                  width={140}
                  height={290}
                />
                <p>
                  {result.media_type == "movie" ? result.title : result.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
