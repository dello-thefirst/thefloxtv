"use client";
import React, { useState } from "react";
export default function MovieScreen({
  movieId,
  movieData,
}: {
  movieId: any;
  movieData: any;
}) {
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  return (
    <div className="movie-container-screen w-full">
      <div className="screen w-full h-[80vh] sm:h-[180px] overflow-hidden mb-3 relative">
        {hasStartedPlaying ? (
          <iframe
            className="w-full h-full"
            id="playit"
            src={`https://vidsrc.to/embed/movie/${movieId}`}
            allowFullScreen
          ></iframe>
        ) : (
          <div
            className="thumbnail w-full h-full relative overflow-hidden bg-cover"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
              backgroundSize: "cover",
            }}
          >
            <div className="mask absolute top-0 left-0 w-full h-[100%] bg-gradient-to-t from-[var(--background-color-1)] to-[#26262637] flex items-center justify-center">
              <div
                className="w-auto h-auto rounded-full bg-[lightgreen] flex items-center justify-center cursor-pointer"
                onClick={() => setHasStartedPlaying(true)}
              >
                <i className="fa-solid fa-circle-play text-[#040812] text-[60px] sm:text-[45px]"></i>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
