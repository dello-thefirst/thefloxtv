"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import MovieLogo from "./MovieLogo";
import "@/app/MainCarousel.css";
import Image from "next/image";
import axios from "axios";
import { MovieDataProps, getWordRange, getLetterRange } from "./Functions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

//loading ui component.
export function LoadingUiStyle() {
  return (
    <>
      <div className="carousel-cont w-full h-screen relative sm:h-[57vh]">
        <Swiper
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          effect="autoplay"
          loop={true}
          modules={[Autoplay]}
          className="carousel w-full h-full"
        >
          <SwiperSlide className="carousel-item active relative">
            <div className="mask"></div>
            <div className="filter"></div>
            <div className="text w-[40%] h-auto overflow-hidden absolute pb-[70px] pl-[3%] left-0 bottom-0 z-[5] sm:w-full sm:pb-[50px] sm:text-center">
              <p className="logo skeleton w-[300px] h-[50px] my-5 rounded-none md:mx-auto"></p>
              <div className="flex gap-5 my-5 md:justify-center">
                <p className="skeleton w-[90px] h-3 rounded-none"></p>
                <p className="skeleton w-[90px] h-3 rounded-none"></p>
                <p className="skeleton w-[90px] h-3 rounded-none"></p>
              </div>
              <div className="md:hidden">
                <p className="skeleton w-full h-3 rounded-none"></p>
                <p className=" skeleton w-full h-3 rounded-none "></p>
                <p className=" skeleton w-full h-3 rounded-none "></p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
export default function MainCarouse() {
  //setting states...
  const [deviceWidth, setDeviceWidth] = useState(800);
  const [deviceHeight, setDeviceHeight] = useState(1200);
  const [isLoading, setIsLoading] = useState(false);
  const [movieData, setMovieData] = useState<MovieDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const req = await axios.get(
          `https://api.themoviedb.org/3/trending/all/week?language=en-US`,
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

  useEffect(() => {
    const screenWidth: number = window.innerWidth;
    const screenHeight: number = window.innerHeight;
    setDeviceWidth(screenWidth);
    setDeviceHeight(screenHeight);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingUiStyle />
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
            {movieData.slice(0, 5).map((result) => (
              <SwiperSlide key={result.id} className="carousel-item relative">
                <div className="mask w-full h-[50%] absolute bg-gradient-to-t from-[var(--background-color-1)] to-black/0 left-0 bottom-0 z-[3]"></div>
                <div className="filter w-full h-full absolute bg-gradient-to-r from-[var(--background-color-1)]  to-black/0 left-0 bottom-0 z-[3]"></div>
                <Image
                  unoptimized
                  src={`https://image.tmdb.org/t/p/w1000_and_h450_multi_faces${result.backdrop_path}`}
                  alt="Slide"
                  className="w-full h-full my-0 mx-auto object-cover"
                  width={900}
                  height={480}
                />
                <div className="text w-[40%] h-auto overflow-hidden absolute pb-[70px] pl-[3%] left-0 bottom-0 z-[5] sm:w-full sm:pb-[50px] sm:text-center">
                  <MovieLogo
                    movieId={result.id}
                    mediaType={result.media_type}
                    movieTitle={result.name ? result.name : result.title}
                  />
                  {/*<p className="title">
                  {result.name ? result.name : result.title}
          </p>*/}
                  <p className="info">
                    <span>
                      {result.media_type === "movie"
                        ? getLetterRange(result.release_date, 4)
                        : getLetterRange(result.first_air_date, 4)}
                    </span>
                    <span className="certification">HD</span>
                    <span>
                      <i className="fa-solid fa-sharp fa-star"></i>{" "}
                      {result.vote_average.toFixed(1)}
                    </span>
                  </p>
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
