"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { MovieDataProps } from "./Functions";

function Popular({ type }: { type: string }) {
  const [popularData, setPopularData] = useState<MovieDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadingSkeletonClass =
    "w-ful bg-[rgb(var(--background-color-2))] skeleton h-[250px] group mb-5 overflow-hidden rounded-md sm:h-[200px]";

  useEffect(() => {
    async function getPopular() {
      try {
        setIsLoading(true);
        const req = await axios.get(
          type == "movies"
            ? `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`
            : `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
            },
          }
        );
        setPopularData(req.data.results);
        if (req.status < 300) {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        getPopular(); //retry on error...
      }
    }
    getPopular();
  }, [type]);

  return (
    <>
      <p className="title text-center text-[35px]  text-white font-sans font-bold md:text-[25px] px-3 sm:text-[18px]">
        {type == "movies" ? "Movies Recommended For You" : "Popular TV Shows"}
      </p>
      <p className="sub text-white text-center font-sans mb-[20px] md:text-[16px] sm:text-[12px]">
        Watch full seasons of exclusive streaming series, current-season
        episodes, hit movies, Hulu Originals, kids shows, and more.
      </p>
      <div className="container h-auto px-[5%] mb-[30px] grid grid-cols-6 gap-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:px-[10%]">
        {!isLoading &&
          popularData.slice(0, 12).map((result) => (
            <Link
              key={result.id}
              href={
                type == "movies" ? `/movies/${result.id}` : `/tv/${result.id}`
              }
            >
              <div>
                <div className="w-full group mb-5 overflow-hidden relative hover:outline outline-2 -outline-offset-1">
                  <div className="mask w-full h-full left-0 bottom-0 z-[2] from-[rgba(var(--background-color-1))] to-[#00000018] bg-gradient-to-t absolute center-div group-hover:opacity-0 transition duration-[0.5s]"></div>
                  <Image
                    unoptimized
                    className="w-full h-[270px] object-cover rounded-md sm:h-[200px]"
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${result.poster_path}`}
                    width={200}
                    height={200}
                    alt=""
                  ></Image>
                </div>
                <p className="title mb-[10px] text-[14px] sm:text-[12px] text-white font-sans">
                  {type == "movies" ? result.title : result.name}
                </p>
              </div>
            </Link>
          ))}
        {isLoading && (
          <>
            <div>
              <div className={loadingSkeletonClass}></div>
            </div>
            <div>
              <div className={loadingSkeletonClass}></div>
            </div>
            <div>
              <div className={loadingSkeletonClass}></div>
            </div>
            <div>
              <div className={loadingSkeletonClass}></div>
            </div>
            <div>
              <div className={loadingSkeletonClass}></div>
            </div>
            <div>
              <div className={loadingSkeletonClass}></div>
            </div>
            <div>
              <div className={loadingSkeletonClass}></div>
            </div>
            <div>
              <div className={loadingSkeletonClass}></div>
            </div>
            <div>
              <div className={loadingSkeletonClass}></div>
            </div>
            <div>
              <div className={loadingSkeletonClass}></div>
            </div>
            <div>
              <div className={loadingSkeletonClass}></div>
            </div>
            <div>
              <div className={loadingSkeletonClass}></div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Popular;
