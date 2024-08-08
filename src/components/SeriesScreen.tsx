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
  const [isSeasonListVisible, setIsSeasonListVisible] = useState(false);
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
    changeSeasonListVisibilty();
  }, [seasonSelect]);

  function changeSeasonListVisibilty() {
    setIsSeasonListVisible(!isSeasonListVisible);
  }

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
                className="w-auo h-auto rounded-full bg-[var(--color-3)] flex items-center justify-center cursor-pointer"
                onClick={() => setHasStartedPlaying(true)}
              >
                <i className="fa-solid fa-circle-play text-[#040812] text-[60px] sm:text-[45px]"></i>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full px-7 sm:px-4">
        <div className="episode-changer-cont relative w-[300px] sm:w-full h-[auto] text-[13px] overflow-hidden">
          <div
            className="season-changer w-full absolute z-[3] shadow-2xl rounded-t-md h-[50px] flex items-center bg-[#071220] justify-center gap-1 cursor-pointer"
            onClick={() => changeSeasonListVisibilty()}
          >
            <i className="bi bi-file-play-fill text-[var(--color-3)]"></i>
            <span>Season {seasonSelect}</span>
            <i className="bi bi-caret-down-fill"></i>
          </div>
          <div
            className={`season-list transition-transform z-[2] top-[40px] duration-[0.2s] max-h-[160px] overflow-y-auto ${
              isSeasonListVisible ? "translate-y-[-1000px]" : "translate-y-0"
            } w-[150px] absolute left-[75px] sm:left-[calc(50% - 75px)] rounded-b-md round shadow-2xl bg-[#03070c]`}
            onBlur={() => changeSeasonListVisibilty()}
          >
            {Array.from({ length: seasonCount }).map(
              (season: any, index: any) => (
                <p
                  key={index}
                  className={`m-3 cursor-pointer ${
                    seasonSelect == index + 1 && "text-[var(--color-3)]"
                  }`}
                  onClick={() => setSeasonSelect(index + 1)}
                >
                  Season {index + 1}
                </p>
              )
            )}
          </div>
          <div
            className="episode-list w-full max-h-[250px] min-h-[250px] overflow-y-auto scroller shadow-2xl mt-[50px] bg-[#08182b] rounded-b-md"
            style={{ scrollbarColor: "white" }}
          >
            {Array.from({
              length: episodeCount,
            }).map((_, index: any) => (
              <div
                key={index}
                className={`w-full h-[50px] cursor-pointer flex items-center gap-2 text-[11px] px-3  ${
                  episodeSelect == index + 1 && "text-black bg-[var(--color-3)]"
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
      </div>
    </div>
  );
}
