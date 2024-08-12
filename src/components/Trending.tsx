"use client";
import React, { useEffect, useState } from "react";
import { MovieDataType } from "../app/types/movie";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { getLetterRange, MovieDataProps } from "./Functions";
import { getMovieDetails, getSeriesDetails } from "../app/functions/fetch";
import TrendingLabel from "./TrendingLabel";

export function LoadingUI() {
  let uiIterator = 1;
  const uiArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return uiArray.map((ui) => (
    <div
      className="item w-auto h-[280px] mr-[10px] flex relative sm:h-[210px] sm:mr-[8px]"
      style={{ flex: "0 0 auto" }}
      key={uiIterator}
    >
      <p className="list-number w-auto h-full center-div font-semibold text-[150px] font-[Lato,Lato-fallback,Arial,sans-serif] text-[#ffffff1e] sm:text-[100px]">
        {uiIterator++}
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
  const [trendingPeriod, setTrendingPeriod] = useState("day");
  const [trendingData, setTrendingData] = useState<MovieDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/${type}/${trendingPeriod}?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
            },
          }
        );
        setTrendingData(res.data.results.slice(0, 10));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }, [type, period, trendingPeriod]);

  return (
    <>
      <div className="cont my-10">
        <div className="mb-5 flex sm:flex-col gap-5 sm:gap-3 items-center text-[12px]">
          <p className="uppercase text-[25px] sm:text-[17px] font-bold text-white">
            <i className="bi bi-file-play-fill text-[var(--color-3)]"></i>{" "}
            Trending {type == "movie" ? "Movies" : "Tv Shows"}
          </p>

          <div className="flex gap-3 sm:gap-1 items-center text-[grey] sm:text-[11px]">
            <div
              onClick={() => setTrendingPeriod("day")}
              className={`px-3 py-1 border-[1.5px] rounded-md cursor-pointer ${
                trendingPeriod == "day"
                  ? " border-[var(--color-3)] text-[var(--color-3)]"
                  : "border-[var(--background-color-2)]"
              }`}
            >
              Today
            </div>
            <div
              onClick={() => setTrendingPeriod("week")}
              className={`px-3 py-1 border-[1.5px] rounded-md cursor-pointer ${
                trendingPeriod == "week"
                  ? " border-[var(--color-3)] text-[var(--color-3)]"
                  : "border-[var(--background-color-2)]"
              }`}
            >
              This Week
            </div>
          </div>
        </div>

        <div className="trending-cont mb-[50px] flex sm:flex-col">
          {/* <div
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
          </div> */}
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
                    className="group item w-auto h-auto flex relative "
                    style={{ flex: "0 0 auto" }}
                  >
                    <p className="group-hover:text-[var(--color-4)] list-number w-auto h-auto center-div font-semibold text-[150px] font-[Lato,Lato-fallback,Arial,sans-serif] text-[#ffffff1e] sm:text-[100px]">
                      {listIterator++}
                    </p>
                    <div className=" w-[180px] sm:w-[150px] relative translate-x-[-10px]">
                      <div className="group-hover:opacity-[1] opacity-[0] duration-[0.7s] w-full h-[250px] sm:h-[200px] rounded-md absolute z-[2] bg-gradient-to-t from-[var(--color-3)] via-[var(--color-4)] to-[transparent] flex items-center justify-center">
                        <i className="text-[50px] sm:text-[45px] text-black bi bi-play-circle-fill"></i>
                      </div>
                      <Image
                        unoptimized
                        className="object-cover rounded-md w-full h-[250px] sm:h-[200px] shadow-2xl"
                        src={`https://themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`}
                        width={220}
                        height={300}
                        alt=""
                      />
                      <TrendingLabel id={result.id} type={type} />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
