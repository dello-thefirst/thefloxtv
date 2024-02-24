"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface PopularProps {
  type?: string;
}

interface popularResult {
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

function Popular(props: PopularProps) {
  const [popularData, setPopularData] = useState([]);
  useEffect(() => {
    async function getPopular() {
      const req = await fetch(
        props.type == "movies"
          ? `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=c19b8e28dc3c9d900ceb4696bf2d247c`
          : `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=c19b8e28dc3c9d900ceb4696bf2d247c`,
        {
          cache: "no-store",
        }
      );
      const res = await req.json();
      setPopularData(res.results);
    }
    getPopular();
  }, [props.type]);

  return (
    <>

      <p className="title text-center text-[35px] text-white font-sans font-bold">
        {props.type =="movies" ?  "Movies Recommended For You" : "Popular TV Shows"}
      </p>
      <p className="sub text-white text-center font-sans mb-[20px]">
        Watch full seasons of exclusive streaming series, current-season
        episodes, hit movies, Hulu Originals, kids shows, and more.
      </p>
      <div className="container h-auto px-[5%] grid grid-cols-10 gap-2 lg:grid-cols-6 md:grid-cols-5 sm:gnrid-cols-3">
        {popularData.map((result: popularResult) => (
          <Link
            key={result.id}
            href={
              props.type == "movies"
                ? `/movies/${result.id}`
                : `/movies/${result.id}`
            }
          >
            <div className="w-full mb-5 overflow-hidden relative">
              <div className="mask group w-full h-full left-0 bottom-0 z-[2] from-[rgba(var(--background-color-1))] to-[#00000018] bg-gradient-to-t absolute center-div"></div>
              <Image
                className="w-full h-full object-cover rounded-md"
                src={`https://themoviedb.org/t/p/original${result.poster_path}`}
                width={150}
                height={280}
                alt=""
              ></Image>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Popular;
