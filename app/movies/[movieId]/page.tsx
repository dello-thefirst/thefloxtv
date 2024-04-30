"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import axios from "axios";
import Image from "next/image";

interface PageParams {
  params: {
    movieId: number;
  };
}

interface MovieData {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  backdrop_path_2: string;
}

function Movie({ params }: PageParams) {
  const [movieData, setMovieData] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
            },
          }
        );
        const response = [];
        response.push(res.data);
        setMovieData(response);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [params.movieId]);
  return (
    <>
      <Header page={`watch-${params.movieId}`} />
      <main className="main-container w-full">
        <div className="movie-container-screen w-full">
          <div className="screen w-full h-[80vh] sm:h-[200px] overflow-hidden mb-3 relative">
            {hasStartedPlaying ? (
              <iframe
                className="w-full h-full"
                id="playit"
                src={`https://vidsrc.to/embed/movie/${params.movieId}`}
                allowFullScreen
              ></iframe>
            ) : isLoading ? (
              <div className="thumbnail w-full h-full skeleton"></div>
            ) : (
              <div className="thumbnail w-full h-full relative over-hidden">
                <Image
                  className="w-full h-full object-cover"
                  src={`https://themoviedb.org/t/p/original${movieData[0].backdrop_path}`}
                  fill
                  alt=""
                ></Image>
                <div className="mask absolute top-0 left-0 w-full h-[100%] bg-gradient-to-t from-[rgb(var(--background-color-1))] to-black/50 flex items-center justify-center">
                  <div
                    className="w-[80px] h-[80px] rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => setHasStartedPlaying(true)}
                  >
                    <i className="fa-solid fa-circle-play text-red-400 text-[60px]"></i>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="movie-details w-full h-full p-3">
          <div className="title text-[25px] text-semibold text-slate-200">
            {isLoading ? (
              <p className="skeleton w-40 h-3 rounded-lg text-[25px]"></p>
            ) : (
              movieData[0].title
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Movie;
