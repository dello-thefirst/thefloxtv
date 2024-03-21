"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MovieDataProps } from "./Functions";
import { getTrendingList } from "../functions/tmdb";
import axios from "axios";

export function LoadingUI() {
  let listIterator = 1;
  const uiArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return uiArray.map((ui) => (
    <div
      className="item w-auto h-[280px] mr-[10px] flex relative sm:h-[210px] sm:mr-[8px]"
      style={{ flex: "0 0 auto" }}
      key={listIterator}
    >
      <p className="list-number w-auto h-full center-div font-semibold text-[150px] font-[Lato,Lato-fallback,Arial,sans-serif] text-[#ffffff1e] sm:text-[100px]">
        {listIterator++}
      </p>
      <div
        className="
                  w-[200px] h-[270px] bg-[rgb(var(--background-color-2))] overflow-hidden sm:w-[150px] relative translate-x-[-10px] sm:h-[200px]"
      ></div>
    </div>
  ));
}

export default function Trending({
  period,
  type,
}: {
  period: string;
  type: string;
}) {
  let listIterator = 1;
  let shouldLog = useRef(true);
  const [trendingData, setTrendingData] = useState<MovieDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      const request = async () => {
        try {
          setIsLoading(true);
          const res = await getTrendingList(period, type);
          setTrendingData(res);
          setIsLoading(false);
          console.log("hey");
        } catch (error) {
          console.log(error);
        }
      };
      request();
    }
  }, []);

  return (
    <>
      <div className="trending-cont mb-[50px] flex sm:flex-col">
        <div
          className="sec-label w-[250px] mb-[20px] "
          style={{ textShadow: "0px 3px 3px rgb(0, 0, 30, 0.8)" }}
        >
          <p className="font text-[25px] mb-3 font-semibold text-gray-200 md:text-[17px] leading-[30px]">
            Top 10 {type == "movie" ? "Movies" : "TV Shows"}{" "}
            {period == "day" ? "Today" : "This Week"}{" "}
          </p>
          <p className="text-[14px] font-light text-gray-300">
            Check out this week’s most popular{" "}
            {type == "movie" ? "Movies" : "TV Shows"} and find choose what to
            watch.
          </p>
        </div>
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
          {isLoading && <LoadingUI />}
          {!isLoading &&
            trendingData.map((result) => (
              <Link
                key={result.id}
                href={
                  result.media_type == "movie"
                    ? `/movies/${result.id}`
                    : `/tv/${result.id}`
                }
              >
                <div
                  className="item w-auto h-[280px] mr-[10px] flex relative sm:h-[210px] sm:mr-[8px]"
                  style={{ flex: "0 0 auto" }}
                >
                  <p className="list-number w-auto h-full center-div font-semibold text-[150px] font-[Lato,Lato-fallback,Arial,sans-serif] text-[#ffffff1e] sm:text-[100px]">
                    {listIterator++}
                  </p>
                  <div
                    className="
                  w-[200px] h-full overflow-hidden sm:w-[150px] relative translate-x-[-10px] cars"
                  >
                    <div className="mask group w-full h-full left-0 bottom-0 z-[2] from-[rgba(var(--background-color-1))] to-[#00000018] bg-gradient-to-t absolute center-div"></div>

                    <Image
                      className="object-cover rounded-md w-full h-full"
                      src={`https://themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`}
                      fill
                      alt=""
                    />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
