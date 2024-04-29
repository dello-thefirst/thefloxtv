"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const loadingSkeletonClass =
  "overflow-hidden rounded-md mr-2  w-[160px] h-[240px] sm:w-[130px] sm:h-[190px] sm:mr-1";

export function LoadingSkeleton() {
  let uiKey = 1;
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ui) => (
    <>
      <div
        className={`skeleton ${loadingSkeletonClass}`}
        key={uiKey++}
        style={{ flex: "0 0 auto" }}
      ></div>
    </>
  ));
}

function Recent({ type }: { type: string }) {
  type RecentData = {
    status: string;
    id: number;
    title: string;
    name: string;
    tmdb_id: string;
    imdb_id: string;
    media_type: string;
    poster_path: string;
    backdrop_path: string;
    year: string;
  };
  const [recentData, setRecentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecent() {
      try {
        setIsLoading(true);
        const req = await axios.get(`/api/${type}/recent`);
        setRecentData(req.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        fetchRecent();
      }
    }
    fetchRecent();
  }, [type]);
  return (
    <div className="mb-[20px]">
      <p className="title sec-label text-[20px] mb-[20px] font-normal text-[white] md:text-[17px]">
        Recently Added {type == "movies" ? "Movies" : "Tv Shows"}
      </p>

      <div
        className="scroll-container no-scrollbar"
        style={{
          display: "flex",
          flexWrap: "nowrap",
          width: "100%",
          height: "auto",
          overflowX: "scroll",
        }}
      >
        {!isLoading ? (
          recentData.map((result: RecentData) => (
            <Link
              href={
                result.media_type == "movie"
                  ? `/movies/${result.tmdb_id}`
                  : `/tv/${result.tmdb_id}`
              }
              key={result.id}
            >
              <div
                className="overflow-hidden mr-2 sm:mr-1"
                style={{ flex: "0 0 auto" }}
              >
                <div className="w-[160px] h-[240px] overflow-hidden sm:w-[130px] sm:h-[190px] relative">
                  <Image
                    className="object-cover w-full h-full rounded-md"
                    src={`https://themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`}
                    width={200}
                    height={300}
                    alt=""
                  />
                </div>
                <p className="text-[16px] text-gray-400 font-sans font-normal my-2 pr-2 sm:text-[13px]">
                  {result.media_type == "movie" ? result.title : result.name}
                </p>
              </div>
            </Link>
          ))
        ) : (
          //Loading skeleton...
          <LoadingSkeleton />
        )}
      </div>
    </div>
  );
}

export default Recent;
