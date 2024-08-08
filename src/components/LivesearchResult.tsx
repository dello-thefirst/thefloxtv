import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getLetterRange } from "./Functions";
import { useQuery } from "react-query";
import { getSearchResult } from "@/src/app/functions/fetch";

const LivesearchResult = (props: { query: string }) => {
  //...
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => await getSearchResult(props.query),
  });
  useEffect(() => {
    refetch();
  }, [props.query]);

  if (isLoading || props.query == "") {
    return (
      <div className="SearchResult">
        <div className="wrapper">
          <div className="item flex gap-[10px] my-[10px]">
            <div className="w-[40px]  h-[50px] rounded-md object-cover skeleton"></div>
            <div className="w-full flex flex-col gap-2">
              <p className="w-[70%] h-3 rounded-sm skeleton opacity-[0.6]"></p>
              <p className="w-[40%] h-2 rounded-sm skeleton opacity-[0.4]"></p>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (data.length == 0 || !data)
    <div className="SearchResult">
      <div className="wrapper">
        <p>No Result Found</p>
      </div>
    </div>;
  else {
    return (
      <div className="SearchResult">
        <div className="wrapper">
          {data.map((result: any) => (
            <Link
              key={result.id}
              href={
                result.media_type == "movie"
                  ? `/movies/${result.id}`
                  : `/tv/${result.id}`
              }
            >
              <div className="item flex gap-[10px] my-[10px]">
                <Image
                  unoptimized
                  className="w-[40px]  h-[50px] rounded-sm object-cover"
                  src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2${
                    result.media_type == "movie"
                      ? result.poster_path
                      : result.poster_path
                  }`}
                  alt=""
                  width={40}
                  height={70}
                />
                <div className="info text-[13px]">
                  <p className="title">
                    {result.media_type == "movie" ? result.title : result.name}
                  </p>
                  <p
                    className="sub text-[var(--color-3)] text-[11px] font-light"
                    style={{ wordSpacing: "3px" }}
                  >
                    {result.media_type == "movie" ? `Movie ` : `TV `}
                    &middot; &nbsp;
                    {result.media_type == "movie"
                      ? getLetterRange(result.release_date, 4)
                      : getLetterRange(result.first_air_date, 4)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default LivesearchResult;
