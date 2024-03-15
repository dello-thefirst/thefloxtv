"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import MovieLogo from "./MovieLogo";
import "@/app/dist/style/MainCarousel.css";
import Image from "next/image";
import axios from "axios";
//Swiper js...
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { truncate } from "fs";

function LoadingUiStyle() {
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
                <p className=" skeleton w-full h-3 rounded-none"></p>
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

function MainCarousel() {
  //...
  const [deviceWidth, setDeviceWidth] = useState(800);
  const [deviceHeight, setDeviceHeight] = useState(1200);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const screenWidth: number = window.innerWidth;
    const screenHeight: number = window.innerHeight;
    setDeviceWidth(screenWidth);
    setDeviceHeight(screenHeight);
  }, []);

  //...
  const getWordRange = (text: string, range: number) => {
    const words = text.split(/\s+/);
    if (words.length > range) {
      const firstXWords = words.slice(0, range);
      const result = firstXWords.join(" ") + "... ";
      return result;
    } else {
      const result = text;
      return result;
    }
  };

  const getLetterRange = (text: string, range: number) => {
    const letters = text.split("");
    const firstXLetters = letters.slice(0, range);
    const result = firstXLetters.join("");
    return result;
  };
  const [movieData, setMovieData] = useState([]);
  const [trendOrder, setTrendOrder] = useState("day");

  interface MovieData {
    results: [];
  }

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

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/all/${trendOrder}?language=en-US&api_key=c19b8e28dc3c9d900ceb4696bf2d247c`
        );
        if (res.status === 200) {
          setIsLoading(false);
        }
        setMovieData(res.data.results);
      } catch (error) {
        console.log(error);
        fetchData();
        console.log("trying againg...")
      }
    }
    fetchData();
  }, []);

  if (isLoading === false) {
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
            {movieData.slice(0, 5).map((result: MovieDataResult) => (
              <SwiperSlide key={result.id} className="carousel-item active">
                <div className="mask"></div>
                <div className="filter"></div>
                <Image
                  src={`https://themoviedb.org/t/p/original/${result.backdrop_path}`}
                  alt="Slide"
                  width={deviceWidth < 800 ? 700 : deviceWidth}
                  height={deviceWidth < 800 ? 400 : deviceHeight}
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
      </>
    );
  } else {
    return <LoadingUiStyle />;
  }
}
export default MainCarousel;
