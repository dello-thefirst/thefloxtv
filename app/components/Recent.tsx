"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
type Props = {
  type: string;
};

function Recent(props: Props) {
  type RecentData = {
    status: string;
    id: number;
    title: string;
    name: string;
    media_type: string;
    poster_path: string;
    year: string;
    //...
    idMovie: string;
    idSeries: string;
    tmdbMovie: number;
    tmdbSeries: number;
    titleMovie: string;
    nameSeries: string;
    bannerMovie: string;
    bannerSeries: string;
    bannerMovieL: string;
    bannerSeriesL: string;
    yearMovie: string;
  };
  const [recentData, setRecentData] = useState([]);
  useEffect(() => {
    async function fetchRecent() {
      try {
        const res = await axios.get(
          `https://floxapi.000webhostapp.com/recent/?type=${props.type}`
        );
        setRecentData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecent();
  }, [props.type]);
  return (
    <div className="pl-[4%] mb-[40px] sm:pl-[5%]">
      <p className="title sec-label text-[25px] mb-[10px] font-sans font-medium text-[white] md:text-[20px]">
        Recently Added {props.type == "movies" ? "Movies" : "Tv Shows"}
      </p>

      <div
        className="scroll-container no-scrollbar"
        style={{
          display: "flex",
          flexWrap: "nowrap",
          width: "100%",
          height: "auto",
          overflowX: "scroll",
        }}
      >
        {recentData.map((result: RecentData) =>
          result.media_type == "movie" ? (
            <div
              className="overflow-hidden rounded-sm mr-[1%]"
              style={{ flex: "0 0 auto" }}
            >
              <div className="w-[270px] h-[160px] sm:w-[170px] sm:h-[90px]">
                <Image
                  className="object-cover w-full h-full"
                  src={`https://themoviedb.org/t/p/original${result.bannerMovieL}`}
                  width={270}
                  height={160}
                  quality={70}
                  alt=""
                />
              </div>
            </div>
          ) : (
            <div
              className="overflow-hidden rounded-sm mr-[1%]"
              style={{ flex: "0 0 auto" }}
              //...
            >
              <div className="w-[270px] h-[160px] sm:w-[170px] sm:h-[90px]">
                <Image
                  className="object-cover w-full h-full"
                  src={`https://themoviedb.org/t/p/original${result.bannerSeriesL}`}
                  width={230}
                  height={160}
                  quality={70}
                  alt=""
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Recent;
