"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import axios from "axios";
import Image from "next/image";
import { MovieDataProps, getWordRange, getLetterRange } from "./Functions";

export function LoadingUiStyle() {
  let iteratorKey = 1;
  return [1, 2, 3].map(() => (
    <SwiperSlide
      className="w-full h-full rounded-2xl skeleton p-2 relative overflow-hidden"
      key={iteratorKey++}
    ></SwiperSlide>
  ));
}

function DiscoverDaily() {
  const [isLoading, setIsLoading] = useState(false);
  const [movieData, setMovieData] = useState<MovieDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const req = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
            },
          }
        );
        setMovieData(req.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <p className="text-center mb-3">
        <i className="fa-regular fa-fire text-[12px]"></i> Trending Now{" "}
        <i className="fa-regular fa-fire text-[12px]"></i>
      </p>
      <Swiper
        className="w-full h-[200px] sm:h-[175px] flex justify-between"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView={
          typeof window !== "undefined" ? (window.innerWidth < 800 ? 1 : 3) : 0
        }
        effect="autoplay"
        loop={true}
        modules={[Autoplay]}
      >
        {isLoading ? (
          <LoadingUiStyle />
        ) : (
          movieData.slice(0, 5).map((result) => (
            <SwiperSlide
              className="w-full h-full p-3 relative overflow-hidden"
              key={result.id}
            >
              <div className="a z-40 w-[150px] sm:w-[130px] h-[45px] sm:h-[40px] shadow-md bg-gray-100 absolute top-0 right-0 rounded-bl-2xl rounded-tr-xl text-[18px] sm:text-[15px] font-normal text-slate-700 flex items-center justify-center">
                Trending Today
              </div>
              <div className="inner w-full h-full relative overflow-hidden">
                <div className="mask rounded-xl w-full h-full absolute top-0 left-0 z-20 bg-gradient-to-tr from-[rgb(var(--background-color-1))] to-[#8c8b8b12]"></div>
                <Image
                  className="w-full h-full object-cover rounded-2xl"
                  src={`https://themoviedb.org/t/p/w500_and_h282_face${result.backdrop_path}`}
                  alt=""
                  width={300}
                  height={180}
                ></Image>
                <div className="absolute bottom-4 left-4 z-30">
                  <p className="text-[14px] font-[500] word sm:text-[12px] text-[#af74eb]">
                    {result.media_type == "movie"
                      ? getLetterRange(result.release_date, 4)
                      : getLetterRange(result.first_air_date, 4)}
                    &nbsp; &middot; &nbsp;
                    {result.media_type == "movie" ? `Movie` : "TV"}
                  </p>
                  <p className="text-[20px] font-semibold text-gray-300">
                    {result.media_type == "movie"
                      ? getWordRange(result.title, 3)
                      : getWordRange(result.name, 3)}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
}

export default DiscoverDaily;
