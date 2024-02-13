"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

type TrendingProp = {
  period: string;
  imageOrientation: string;
};

export default function Trending(props: TrendingProp) {
  //...
  interface MovieDataResult {
    id: number;
    title: string;
    name: string;
    media_type: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    release_date: string;
    first_air_date: string;
    duration: number;
    vote_average: number;
  }
  //...
  const [trendingPeriod, setTrendingPeriod] = useState(props.period);
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await fetch(
        `https://api.themoviedb.org/3/trending/all/${trendingPeriod}?language=en-US&api_key=c19b8e28dc3c9d900ceb4696bf2d247c`,
        { cache: "no-store" }
      );
      const res = await req.json();
      setTrendingData(res.results);
    }
    fetchData();
  }, [trendingPeriod]);
  //...
  return (
    <>
      <div className="trending-cont px-[3%] mb-[200px] ">
        <p className="sec-label">
          Trending {props.period == "day" ? "Today" : "This Week"}
        </p>
        <br />
        <div
          className="scroll-container"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            width: "100%",
            height: "auto",
            overflowX: "scroll",
          }}
        >
          {trendingData.map((result: MovieDataResult) => (
            <Link
              key={result.id}
              href={
                result.media_type == "movie"
                  ? `/movie/${result.id}`
                  : `/tv/${result.id}`
              }
            >
              <div
                className="item w-[130px] h-[190px] mr-[10px] overflow-hidden"
                style={{ flex: "0 0 auto" }}
              >
                <Image
                  className="object-cover w-full h-full"
                  src={
                    props.imageOrientation == "landscape"
                      ? `https://themoviedb.org/t/p/original${result.poster_path}`
                      : `https://themoviedb.org/t/p/original${result.poster_path}`
                  }
                  width={120}
                  height={200}
                  alt=""
                />
                <p className="lg:text-[20px] font-light sm:text-[13px]">
                  {result.media_type == "movie" ? result.title : result.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
