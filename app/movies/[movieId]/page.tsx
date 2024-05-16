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

export function LoadingSkin() {
  return (
    <div>
      <div></div>
    </div>
  );
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
                />
                <div className="mask absolute top-0 left-0 w-full h-[100%] bg-gradient-to-t from-[var(--background-color-1)] to-black/60 flex items-center justify-center">
                  <div
                    className="w-[80px] h-[80px] rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => setHasStartedPlaying(true)}
                  >
                    <i className="fa-solid fa-circle-play text-[var(--color-3)] text-[60px]"></i>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {isLoading ? (
          <LoadingSkin />
        ) : (
          <div className="movie-details w-full h-auto flex p-5 gap-3 mt-5">
            <div className="small-image-container w-[200px] h-[270px] rounded-md overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src={`https://themoviedb.org/t/p/w220_and_h330_face${movieData[0].poster_path}`}
                width={220}
                height={330}
                alt=""
              />
            </div>
            <div className="title-card text-semibold text-slate-200">
              <p className="text-[30px] font-bold">{movieData[0].title}</p>
              <div>
                <span className="w-auto h-auto px-2 py-1 text-[13px] font-bold text-black bg-[var(--color-3)] rounded-2xl">
                  HD
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Movie;
