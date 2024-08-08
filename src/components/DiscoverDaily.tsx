"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getWordRange, getLetterRange } from "./Functions";
import { DDLoadingUI } from "./LoadingUI/DDLoadingUI";
import { useQuery } from "react-query";
import { fetchTrending } from "../app/functions/fetch";

function DiscoverDaily() {
  const { data: movieData, isLoading } = useQuery({
    queryFn: async () => await fetchTrending("day"),
    queryKey: ["discoverdaily"],
  });

  return (
    <>
      <p className="text-center mb-3">
        <i className="fa-regular fa-fire text-[12px]"></i> Trending Now{" "}
        <i className="fa-regular fa-fire text-[12px]"></i>
      </p>
      <Swiper
        className="w-full h-[220px] sm:h-[185px]"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView={
          typeof window !== "undefined"
            ? window.innerWidth < 800
              ? 1
              : window.innerWidth < 1200
              ? 2
              : 3
            : 0
        }
        pagination={{
          el: ".swiper-progress",
          type: "progressbar",
        }}
        effect="autoplay"
        spaceBetween={10}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {isLoading ? (
          <DDLoadingUI />
        ) : (
          movieData.slice(0, 9).map((result: any) => (
            <SwiperSlide
              className="p-1 relative overflow-hidden"
              key={result.id}
            >
              <Link
                href={
                  result.media_type == "movie"
                    ? `/movies/${result.id}`
                    : `/tv/${result.id}`
                }
              >
                <div className="a z-40 w-[150px] sm:w-[130px] h-[45px] sm:h-[40px] shadow-md bg-gray-100 absolute top-0 right-0 rounded-bl-2xl rounded-tr-xl text-[18px] sm:text-[15px] font-normal text-slate-700 flex items-center justify-center">
                  Trending Today
                </div>
                <div
                  className="inner w-full h-[95%] relative p-0 rounded-xl"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${result.backdrop_path})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="mask w-[100%] h-full absolute top-0 left-0 bottom-0 right-0 z-20 bg-gradient-to-t from-[var(--background-color-1)] via-[#1f1b2989] to-[transparent]"></div>
                  <div className="absolute bottom-4 left-4 z-30">
                    <p className="text-[14px] font-[500] word sm:text-[12px] text-[var(--color-3)]">
                      {result.media_type == "movie"
                        ? getLetterRange(result.release_date, 4)
                        : getLetterRange(result.first_air_date, 4)}
                      &nbsp; &middot; &nbsp;
                      {result.media_type == "movie" ? `Movie` : "TV"}
                    </p>
                    <p className="text-[20px] font-semibold text-gray-300 uppercase">
                      {result.media_type == "movie"
                        ? getWordRange(result.title, 3)
                        : getWordRange(result.name, 3)}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
        )}
        <div className="swiper-progress"></div>
      </Swiper>
    </>
  );
}

export default DiscoverDaily;
