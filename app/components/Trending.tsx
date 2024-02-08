"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
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
  }, [props.period]);
  //...
  return (
    <>
      <div className="trending-cont pl-[3%] mb-[200px]">
        <p className="sec-label">
          Trending {props.period == "day" ? "Today" : "This Week"}
        </p>
        <br />
        <Swiper
          slidesPerView={window.innerWidth > 700 ? 5 : 3}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {trendingData.map((result: MovieDataResult) => (
            <SwiperSlide className="item w-[200px]">
              <img
                style={{ objectFit: "cover" }}
                src={
                  props.imageOrientation == "landscape"
                    ? `https://media.themoviedb.org/t/p/w500_and_h282_face${result.backdrop_path}`
                    : `https://media.themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
