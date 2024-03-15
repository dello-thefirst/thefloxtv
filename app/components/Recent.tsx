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

  const loadingSkeletonClass =
    "bg-[rgb(var(--background-color-2))] overflow-hidden rounded-md skeleton-static mr-2  w-[160px] h-[240px] sm:w-[130px] sm:h-[90px] sm:mr-1";
  useEffect(() => {
    async function fetchRecent() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://floxapi.000webhostapp.com/recent/?type=${props.type}`
        );
        setRecentData(res.data);
        if (res.status === 200) {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(true);
      }
    }
    fetchRecent();
  }, [props.type]);
  return (
    <div className="pl-[4%] mb-[20px] sm:pl-[5%]">
      <p className="title sec-label text-[20px] mb-[20px] font-normal text-[white] md:text-[17px]">
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
        {!isLoading ? (
          recentData.map((result: RecentData) => (
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
                <div className="w-[160px] h-[240px] overflow-hidden sm:w-[130px] sm:h-[190px] relative">
                  <Image
                    className="object-cover w-full h-full rounded-md"
                    src={`https://floxapi.000webhostapp.com/images/?url=${
                      result.media_type == "movie"
                        ? result.bannerMovie
                        : result.bannerSeries
                    }&width=200`}
                    width={200}
                    height={300}
                    alt=""
                  />
                </div>
                <p className="text-[16px] text-gray-400 font-sans font-normal my-2 pr-2 sm:text-[13px]">
                  {result.media_type == "movie"
                    ? result.titleMovie
                    : result.nameSeries}
                </p>
              </div>
            </Link>
          ))
        ) : (
          //Loading skeleton...
          <>
            <div
              className={loadingSkeletonClass}
              style={{ flex: "0 0 auto" }}
            ></div>
            <div
              className={loadingSkeletonClass}
              style={{ flex: "0 0 auto" }}
            ></div>
            <div
              className={loadingSkeletonClass}
              style={{ flex: "0 0 auto" }}
            ></div>
            <div
              className={loadingSkeletonClass}
              style={{ flex: "0 0 auto" }}
            ></div>
            <div
              className={loadingSkeletonClass}
              style={{ flex: "0 0 auto" }}
            ></div>
            <div
              className={loadingSkeletonClass}
              style={{ flex: "0 0 auto" }}
            ></div>
            <div
              className={loadingSkeletonClass}
              style={{ flex: "0 0 auto" }}
            ></div>
            <div
              className={loadingSkeletonClass}
              style={{ flex: "0 0 auto" }}
            ></div>
            <div
              className={loadingSkeletonClass}
              style={{ flex: "0 0 auto" }}
            ></div>
          </>
        )}
      </div>
    </div>
  );
}

export default Recent;
