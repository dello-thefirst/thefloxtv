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
              className="w-full h-full rounded-2xl p-2 relative overflow-hidden"
              key={result.id}
            >
              <div className="a z-10 w-[150px] sm:w-[130px] h-[45px] sm:h-[40px] shadow-md bg-gray-100 absolute top-0 right-0 rounded-bl-2xl text-[18px] sm:text-[15px] font-normal text-slate-700 flex items-center justify-center">
                Trending Today
              </div>
              <div className="inner w-full h-full  relative">
                <div className="rounded-2xl absolute z-2 top-0 mask w-full h-full bg-gradient-to-r from-slate-950/90 to-[#b4b4b412] p-3">
                  <div>
                    <p className="text-[22px] font-light word sm:text-[18px]">
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
                <Image
                  className="w-full h-full object-cover rounded-2xl"
                  src={`https://themoviedb.org/t/p/w500_and_h282_face${result.backdrop_path}`}
                  alt=""
                  width={300}
                  height={180}
                ></Image>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
}

export default DiscoverDaily;
