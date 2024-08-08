"use client";
import React from "react";
import Link from "next/link";
import MovieLogo from "./MovieLogo";
import Image from "next/image";
import "@/src/app/MainCarousel.css";
import { getWordRange, getLetterRange } from "./Functions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useQuery } from "react-query";
import { fetchTrending } from "@/src/app/functions/fetch";
import { MainLoadingUI } from "./LoadingUI/MainLoadingUI";

export default function Main() {
  //...
  const { data: movieData, isLoading } = useQuery({
    queryFn: async () => await fetchTrending("day"),
    queryKey: ["main_carousel"],
    refetchInterval: 5000,
  });

  return (
    <>
      {isLoading ? (
        <MainLoadingUI />
      ) : (
        <div className="carousel-cont w-full h-screen relative sm:h-[57vh]">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect="autoplay"
            loop={true}
            modules={[Autoplay]}
            className="carousel w-full h-full"
          >
            {movieData.slice(0, 5).map((result: any) => (
              <SwiperSlide key={result.id} className="carousel-item relative">
                <div className="mask w-full h-[60%] absolute bg-gradient-to-t from-[var(--background-color-1)] via-transparent to-transparent left-0 bottom-0 z-[3]"></div>
                <div className="filter w-full h-full absolute bg-gradient-to-r from-[var(--background-color-1)] via-[#0e0c1976] to-transparent left-0 bottom-0 z-[3]"></div>
                <Image
                  unoptimized
                  src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
                  alt="Slide"
                  className="w-full h-full my-0 mx-auto object-cover"
                  width={900}
                  height={480}
                />
                <div className="text w-[60%] h-auto overflow-hidden absolute bottom-0 pb-[70px] pl-[3%] left-0 z-[5] sm:w-full sm:pb-[50px] sm:text-center">
                  <MovieLogo
                    movieId={result.id}
                    mediaType={result.media_type}
                    movieTitle={result.name ? result.name : result.title}
                  />
                  {/*<p className="title">
                  {result.name ? result.name : result.title}
                  </p>*/}
                  <div className="info flex items-center">
                    <span>
                      {result.media_type === "movie"
                        ? getLetterRange(result.release_date, 4)
                        : getLetterRange(result.first_air_date, 4)}
                    </span>
                    <span className="certification">HD</span>
                    <span>
                      <i className="fa-solid fa-star"></i>{" "}
                      {result.vote_average.toFixed(1)}
                    </span>
                  </div>
                  <p className="genre">History Drama </p>
                  <p className="desc">
                    {result.overview.split(/\s+/).length > 25
                      ? getWordRange(result.overview, 25)
                      : result.overview}
                  </p>
                  <div className="buttons">
                    <Link
                      href={
                        result.media_type === "movie"
                          ? `/movies/${result.id}`
                          : `/tv/${result.id}`
                      }
                    >
                      <button className="view-btn watch-now">
                        <i className="fa-solid fa-circle-play"></i> Watch
                      </button>
                    </Link>
                    <button className="view-btn" style={{ background: "none" }}>
                      <i className="fa-light fa-bookmark"></i>&nbsp;Bookmark
                    </button>
                  </div>
                </div>

                <div className="small-banner-slider w-[25%] absolute my-[50px] mx-[3%] right-0 bottom-0 z-[5] flex items-center justify-center sm:hidden">
                  <div className="item">
                    <Image
                      className="w-[170px] rounded-lg"
                      src={`https://themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`}
                      width={150}
                      alt={""}
                      height={200}
                    />
                    <p className="active title text-center">
                      {result.media_type === "movie"
                        ? getWordRange(result.title, 2)
                        : getWordRange(result.name, 2)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
