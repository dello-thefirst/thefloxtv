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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchRecent() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://floxapi.000webhostapp.com/recent/?type=${props.type}`
        );
        setRecentData(res.data);
      } catch (error) {
        console.log(error);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecent();
  }, [props.type]);
  if (isLoading === false) {
    return (
      <div className="pl-[4%] mb-[20px] sm:pl-[5%]">
        <p className="title sec-label text-[20px] mb-[10px] font-sans font-normal text-[white] md:text-[17px]">
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
                className="overflow-hidden mr-2 sm:mr-1"
                style={{ flex: "0 0 auto" }}
              >
                <div className="w-[270px] h-[150px] rounded-md overflow-hidden sm:w-[150px] sm:h-[80px] relative">
                  <Image
                    className="object-cover w-full h-full"
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
  } else {
    return (
      <div className="pl-[4%] mb-[20px] sm:pl-[5%]">
        <p className="title sec-label text-[20px] mb-[10px] font-sans font-normal text-[white] md:text-[17px]">
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
          <div
            className="overflow-hidden mr-2 sm:mr-1"
            style={{ flex: "0 0 auto" }}
          >
            <div className="w-[270px] h-[150px] rounded-md overflow-hidden sm:w-[150px] sm:h-[80px] relative bg-gray-600 opacity-[10%]"></div>
          </div>
          <div
            className="overflow-hidden mr-2 sm:mr-1"
            style={{ flex: "0 0 auto" }}
          >
            <div className="w-[270px] h-[150px] rounded-md overflow-hidden sm:w-[150px] sm:h-[80px] relative bg-gray-600 opacity-[10%]"></div>
          </div>
          <div
            className="overflow-hidden mr-2 sm:mr-1"
            style={{ flex: "0 0 auto" }}
          >
            <div className="w-[270px] h-[150px] rounded-md overflow-hidden sm:w-[150px] sm:h-[80px] relative bg-gray-600 opacity-[10%]"></div>
          </div>
          <div
            className="overflow-hidden mr-2 sm:mr-1"
            style={{ flex: "0 0 auto" }}
          >
            <div className="w-[270px] h-[150px] rounded-md overflow-hidden sm:w-[150px] sm:h-[80px] relative bg-gray-600 opacity-[10%]"></div>
          </div>
          <div
            className="overflow-hidden mr-2 sm:mr-1"
            style={{ flex: "0 0 auto" }}
          >
            <div className="w-[270px] h-[150px] rounded-md overflow-hidden sm:w-[150px] sm:h-[80px] relative bg-gray-600 opacity-[10%]"></div>
          </div>
          <div
            className="overflow-hidden mr-2 sm:mr-1"
            style={{ flex: "0 0 auto" }}
          >
            <div className="w-[270px] h-[150px] rounded-md overflow-hidden sm:w-[150px] sm:h-[80px] relative bg-gray-600 opacity-[10%]"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recent;
