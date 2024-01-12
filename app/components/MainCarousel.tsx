"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import MovieLogo from "./MovieLogo";
import "@/app/dist/style/MainCarousel.css";
//Swiper js...
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { error } from "console";

function MainCarousel() {
  //...
  const getWordRange = (text: string, range: number) => {
    const words = text.split(/\s+/);
    if (words.length > range) {
      const firstXWords = words.slice(0, range);
      const result = firstXWords.join(" ") + "...";
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
  const [controlledSwiper, setControlledSwiper] = useState(null);
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
    fetch(
      `https://api.themoviedb.org/3/trending/all/${trendOrder}?language=en-US&api_key=c19b8e28dc3c9d900ceb4696bf2d247c`
    )
      .then((response) => response.json())
      .then((json: MovieData) => {
        console.log(json);
        setMovieData(json.results);
      });
  }, []);

  const handleControlledSwiper = (controlledSwiper: Swiper) => {
    setControlledSwiper(controlledSwiper);
  };
  return (
    <>
      <div className="carousel-cont">
        <Swiper
          effect="fade"
          modules={[EffectFade, Controller]}
          onSwiper={handleControlledSwiper}
          className="carousel"
        >
          {movieData.map((result: MovieDataResult) => (
            <SwiperSlide key={result.id} className="carousel-item active">
              <img
                src={`https://www.themoviedb.org/t/p/original/${result.backdrop_path}`}
                alt="Slide"
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
                  <span className="certification">?</span>
                  <span>
                    <i className="bi bi-star-fill"></i> {result.vote_average}
                  </span>
                  <span>
                    {result.media_type === "movie"
                      ? getLetterRange(result.release_date, 4)
                      : getLetterRange(result.first_air_date, 4)}
                  </span>
                </p>
                <p className="genre">History Drama </p>
                <p className="desc">
                  {result.overview.split(/\s+/).length > 50
                    ? getWordRange(result.overview, 50)
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
                    <button className="btn btn-outline btn-primary all-centered">
                      <i className="fa-solid fa-circle-play"></i> Watch Now
                    </button>
                  </Link>
                  <button className="view-btn all-centered">
                    <i className="fa-light fa-bookmark"></i>&nbsp;Bookmark
                  </button>
                </div>
              </div>
              <div id={`carousel-mask-${result.id}`} className="mask"></div>
              <div className="filter"></div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="small-banner-slider">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            slidesPerView={3}
            spaceBetween={10}
            modules={[Autoplay, Controller]}
            controller={{ control: controlledSwiper }}
            className="carousel"
          >
            {movieData.map((result: MovieDataResult) => (
              <SwiperSlide key={result.id} className="item cursor-pointer">
                {({ isActive, isNext }) => (
                  <Link
                    href={
                      result.media_type === "movie"
                        ? `/movies/${result.id}`
                        : `/tv/${result.id}`
                    }
                  >
                    <img
                      className={isActive ? "active" : "inactive"}
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`}
                    />
                    <p className={isActive ? "active title" : "inactive title"}>
                      {result.media_type === "movie"
                        ? getWordRange(result.title, 2)
                        : getWordRange(result.name, 2)}
                    </p>
                  </Link>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default MainCarousel;
