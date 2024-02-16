"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { empty } from "@prisma/client/runtime/library";

type TrendingProp = {
  period: string;
  imageOrientation?: string;
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

  if (trendingData !== null && trendingData.length !== 0) {
    return (
      <>
        <div className="trending-cont pl-[4%] mb-[20px] sm:pl-[5%] ">
          <p className="sec-label text-[15px] mb-[10px] ">
            Trending {props.period == "day" ? "Today" : "This Week"}
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
            {trendingData.map((result: MovieDataResult) => (
              <Link
                key={result.id}
                href={
                  result.media_type == "movie"
                    ? `/movies/${result.id}`
                    : `/tv/${result.id}`
                }
              >
                <div
                  className="item w-[150px] h-[220px] mr-[10px] overflow-hidden relative sm:w-[110px] sm:h-[170px] sm:mr-[8px] rounded-md"
                  style={{ flex: "0 0 auto" }}
                >
                  <div className="mask w-full h-full bg-opacity-60 bg from-[rgba(var(--background-color-1))] to-[#00000005] bg-gradient-to-t absolute duration-[0.3s] transition-opacity center-div">
                    <div className="play w-[20px] h-[20px] rounded-full bg-[#000] center-div">
                      <i className="fa-solid fa-play text-[8px] text-[#ff2d7e]"></i>
                    </div>
                  </div>

                  <Image
                    className="object-cover w-full h-full"
                    src={
                      props.imageOrientation == "landscape"
                        ? `https://themoviedb.org/t/p/original${result.poster_path}`
                        : `https://themoviedb.org/t/p/original${result.poster_path}`
                    }
                    width={130}
                    height={210}
                    quality={100}
                    alt=""
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }
}
