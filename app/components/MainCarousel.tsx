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
      <div className="carousel-cont">
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="autoplay"
          loop={true}
          modules={[Autoplay]}
          className="carousel"
        >
          <SwiperSlide className="carousel-item active">
            <div className="mask"></div>
            <div className="filter"></div>
            <div className="text">
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
        <div className="carousel-cont">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect="autoplay"
            loop={true}
            modules={[Autoplay]}
            className="carousel"
          >
            {movieData.slice(0, 5).map((result) => (
              <SwiperSlide key={result.id} className="carousel-item active">
                <div className="maskk w-full h-[50%] absolute bg-gradient-to-t from-[var(--background-color-1)] to-black/0 left-0 bottom-0 z-[3]"></div>
                <div className="filterr w-full h-full absolute bg-gradient-to-tr from-[var(--background-color-1)]  to-black/0 left-0 bottom-0 z-[3]"></div>
                <Image
                  src={`https://themoviedb.org/t/p/original/${result.backdrop_path}`}
                  alt="Slide"
                  className="w-full h-full"
                  width={
                    typeof window !== "undefined" ? window.innerWidth : 1200
                  }
                  height={
                    typeof window !== "undefined" ? window.innerHeight : 600
                  }
                />
                <div className="text">
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

                <div className="small-banner-slider">
                  <div className="item">
                    <Image
                      src={`https://themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`}
                      width={150}
                      alt={""}
                      height={200}
                    />
                    <p className="active title">
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
