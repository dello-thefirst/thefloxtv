"use client";
import React, { useEffect, useRef, useState } from "react";
import { setTimeout } from "timers";
export default function SeriesScreen({
  tvId,
  seriesData,
}: {
  tvId: any;
  seriesData: any;
}) {
  const collapseRef = useRef<any>();
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [seasonSelect, setSeasonSelect] = useState(1);
  const [episodeSelect, setEpisodeSelect] = useState(1);
  const seasonCount = seriesData.last_episode_to_air.season_number;
  const episodeCount =
    seasonSelect ==
    seriesData.seasons[seriesData.seasons.length - 1].season_number
      ? seriesData.last_episode_to_air.episode_number
      : seriesData.seasons.filter(
          (season_filter: any) => season_filter.season_number == seasonSelect
        )[0].episode_count;

  //Reset to episode 1 if the season is changed and minimize the dropdown
  useEffect(() => {
    setEpisodeSelect(1);
    if (collapseRef.current) {
      setTimeout(() => collapseRef.current.click(), 500);
    }
  }, [seasonSelect]);

  return (
    <div className="movie-container-screen w-full">
      <div className="screen w-full h-[80vh] sm:h-[200px] overflow-hidden mb-3 relative">
        {hasStartedPlaying ? (
          <iframe
            className="w-full h-full"
            id="playit"
            src={`https://vidsrc.cc/v2/embed/tv/${tvId}/${seasonSelect}/${episodeSelect}`}
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
      <div className="w-[50vw] mt-20 sm:mt-5 sm:w-[auto] h-auto px-7 sm:px-4">
        <div className="collapse bg-transparent p-0 rounded-xl">
          <input type="checkbox" ref={collapseRef} />
          <div className="collapse-title text-[15px] text-[lightgreen] bg-base-100 ">
            Season {seasonSelect} <i className="fa-solid fa-caret-down"></i>
          </div>
          <div className="collapse-content bg-base-200 cursor-pointer">
            <div className="w-full max-h-[200px] overflow-y-scroll">
              {Array.from({ length: seasonCount }).map(
                (season: any, index: any) => (
                  <p
                    key={index}
                    className={`py-4 ${
                      seasonSelect == index + 1 && "text-[lightgreen]"
                    }`}
                    onClick={() => setSeasonSelect(index + 1)}
                  >
                    Season {index + 1}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="scroll-container no-scrollbar mt-5 px-7 sm:px-4"
        style={{
          display: "flex",
          flexWrap: "nowrap",
          width: "100%",
          height: "auto",
          overflowX: "scroll",
          gap: 10,
        }}
      >
        {Array.from({
          length: episodeCount,
        }).map((_, index: any) => (
          <div
            key={index}
            className={`w-[auto] h-[auto] px-4 py-2 bg-base-100 cursor-pointer rounded-md flex items-center justify-center gap-2 text-[11px]  ${
              episodeSelect == index + 1 &&
              "text-[lightgreen] border border-[lightgreen]"
            } `}
            style={{ flex: "0 0 auto" }}
            onClick={() => setEpisodeSelect(index + 1)}
          >
            <i className="fa-solid fa-circle-play"></i>
            Episode {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
