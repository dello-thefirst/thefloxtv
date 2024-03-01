"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
type Props = {
  type: string;
};

function Recent(props: Props) {
  type RecentData = {
    status: string;
    id: number;
    title: string;
    name: string;
    media_type: string;
    poster_path: string;
    year: string;
    //...
    idMovie: number;
    idSeries: number;
    tmdbMovie: number;
    tmdbSeries: number;
    titleMovie: string;
    nameSeries: string;
    bannerMovie: string;
    bannerSeries: string;
    bannerMovieL: string;
    bannerSeriesL: string;
    yearMovie: string;
  };
  const [recentData, setRecentData] = useState([]);
  useEffect(() => {
    async function fetchRecent() {
      try {
        const res = await axios.get(
          `https://floxapi.000webhostapp.com/recent/?type=${props.type}`
        );
        setRecentData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecent();
  }, [props.type]);
  return (
    <div className="pl-[4%] mb-[40px] sm:pl-[3%]">
      <p className="title sec-label text-[25px] mb-[10px] font-sans font-medium text-[white] md:text-[17px]">
        Recently Added {props.type == "movies" ? "Movies" : "Tv Shows"}
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
        {recentData.map((result: RecentData) => (
          <Link
            href={
              result.media_type == "movie"
                ? `/movies/${result.tmdbMovie}`
                : `/tv/${result.tmdbSeries}`
            }
            key={
              result.media_type == "movie" ? result.idMovie : result.idSeries
            }
          >
            <div
              className="overflow-hidden mr-2"
              style={{ flex: "0 0 auto" }}
            >
              <div className="w-[270px] h-[160px] sm:w-[160px] sm:h-[90px] relative">
                <div className="mask group w-full h-full left-0 bottom-0 z-[2] from-[rgba(var(--background-color-1))] to-[#00000018] bg-gradient-to-t absolute center-div"></div>
                <Image
                  className="object-cover w-full rounded-lg h-full"
                  src={`https://themoviedb.org/t/p/original${
                    result.media_type == "movie"
                      ? result.bannerMovieL
                      : result.bannerSeriesL
                  }`}
                  width={270}
                  height={160}
                  quality={70}
                  alt=""
                />
              </div>
              <p className="text-[18px] text-gray-400 font-sans font-normal my-2 pr-2 sm:text-[13px]">
                {result.media_type == "movie"
                  ? result.titleMovie
                  : result.nameSeries}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recent;
