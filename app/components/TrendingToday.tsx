"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
export default function TrendingToday() {
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
  const [trendingData, setTrendingData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=c19b8e28dc3c9d900ceb4696bf2d247c`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setTrendingData(data.results);
    }
    fetchData();
  }, []);
  //...
  return (
    <>
      <div className="trending-today-cont pl-[3%] mb-[200px]">
        <p className="sec-label">Trending this week</p>
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
            <SwiperSlide className="item">
              <img
                style={{ objectFit: "cover" }}
                src={`https://media.themoviedb.org/t/p/w500_and_h282_face/${result.backdrop_path}`}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
