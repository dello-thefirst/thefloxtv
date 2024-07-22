"use client";
import React, { useState } from "react";
export default function SeriesScreen({
  tvId,
  seriesData,
}: {
  tvId: any;
  seriesData: any;
}) {
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [episodeCount, setEpisodeCoount] = useState(10);
  return (
    <div className="movie-container-screen w-full">
      <div className="screen w-full h-[80vh] sm:h-[200px] overflow-hidden mb-3 relative">
        {hasStartedPlaying ? (
          <iframe
            className="w-full h-full"
            id="playit"
            src={`https://vidsrc.to/embed/tv/${tvId}`}
            allowFullScreen
          ></iframe>
        ) : (
          <div
            className="thumbnail w-full h-full relative overflow-hidden bg-cover"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${seriesData.backdrop_path})`,
              backgroundSize: "cover",
            }}
          >
            <div className="mask absolute top-0 left-0 w-full h-[100%] bg-gradient-to-t from-[var(--background-color-1)] to-[#26262637] flex items-center justify-center">
              <div
                className="w-auo h-auto rounded-full bg-[lightgreen] flex items-center justify-center cursor-pointer"
                onClick={() => setHasStartedPlaying(true)}
              >
                <i className="fa-solid fa-circle-play text-[#040812] text-[60px] sm:text-[45px]"></i>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-[25vw] mt-20 sm:mt-5 sm:w-[auto] h-auto px-5 sm:px-3">
        <div className="collapse bg-transparent p-0">
          <input type="checkbox" />
          <div className="collapse-title bg-base-100  ">
            Seasons <i className="fa-solid fa-caret-down"></i>
          </div>
          <div className="collapse-content bg-base-200">
            {seriesData.seasons
              .filter((season_filter: any) => season_filter.season_number > 0)
              .map((season: any) => (
                <p key={season.id} className="py-4">
                  Season {season.season_number}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div
        className="scroll-container no-scrollbar mt-5 px-5 sm:px-3"
        style={{
          display: "flex",
          flexWrap: "nowrap",
          width: "100%",
          height: "auto",
          overflowX: "scroll",
          gap: 10,
        }}
      >
        {Array.from({ length: episodeCount }).map((_, index: any) => (
          <div
            key={index}
            className="w-[auto] h-[auto] px-4 py-2 bg-base-100 rounded-md flex items-center justify-center text-[11px]"
            style={{ flex: "0 0 auto" }}
          >
            Episode {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
