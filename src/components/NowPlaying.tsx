"use client";
import React, { useState } from "react";
import { useSwiper } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { Controller, EffectCards } from "swiper/modules";
import Image from "next/image";
import { useQuery } from "react-query";
import { fetchNowPlaying } from "../app/functions/fetch";

export default function NowPlaying() {
  const swiper = useSwiper();
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const { data: movieData, isLoading } = useQuery({
    queryFn: async () => await fetchNowPlaying("movie"),
    queryKey: ["hsvaukb"],
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="w-full p-10 my-10 bg-[var(--background-color-3)]">
        <Swiper
          modules={[Controller]}
          onSwiper={() => setFirstSwiper}
          controller={{ control: secondSwiper }}
          className="mySwiper w-full h-[500px]"
        >
          {movieData.map((item: any) => (
            <SwiperSlide key={item.id} className="w-full">
              <Image
                className="w-full rounded-md"
                unoptimized
                src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.backdrop_path}`}
                width={200}
                height={300}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Controller]}
          onSwiper={() => setSecondSwiper}
          controller={{ control: firstSwiper }}
          className="mySwiper"
        >
          {movieData.map((item: any) => (
            <SwiperSlide key={item.id} className="w-full">
              <Image
                className="w-full rounded-md"
                unoptimized
                src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`}
                width={200}
                height={300}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
