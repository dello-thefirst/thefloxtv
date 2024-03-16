"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Calendar from "./Calendar";
import axios from "axios";

type TrendingProp = {
  period: string;
  imageOrientation?: string;
};

type LoadingUIProps = {
  iterator: number;
};

function LoadingUI(props: LoadingUIProps) {
  return (
    <div
      className="item w-auto h-[280px] mr-[10px] flex relative sm:h-[210px] sm:mr-[8px]"
      style={{ flex: "0 0 auto" }}
    >
      <p className="list-number w-auto h-full center-div font-semibold text-[150px] font-[Lato,Lato-fallback,Arial,sans-serif] text-[#ffffff1e] sm:text-[100px]">
        {props.iterator}
      </p>
      <div
        className="
                  w-[200px] h-[270px] skeleton overflow-hidden sm:w-[150px] relative translate-x-[-10px] sm:h-[200px]"
      ></div>
    </div>
  );
}

export default function Trending(props: TrendingProp) {
  //...
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
  //...
  const [trendingPeriod, setTrendingPeriod] = useState(props.period);
  const [trendingData, setTrendingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let listIterator = 1;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/all/${trendingPeriod}?language=en-US&api_key=c19b8e28dc3c9d900ceb4696bf2d247c`
        );
          setTrendingData(res.data.results);
      } catch (error) {
        console.log(error);
        fetchData(); //retry on error...
      }finally {
        setIsLoading(false)
      }
    }
    fetchData();
  }, [trendingPeriod]);
  //...

  return (
    <>
      <div className="trending-cont pl-[4%] mb-[40px] sm:pl-[3%] ">
        <div
          className="sec-label text-[25px] mb-[10px] font-sans font-medium text-[white] md:text-[17px]"
          style={{ textShadow: "0px 3px 3px rgb(0, 0, 30, 0.8)" }}
        >
          Trending Worldwide {props.period == "day" ? "Today" : "This Week"}{" "}
          <Calendar />
        </div>
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
          {!isLoading ? (
            trendingData.slice(0, 10).map((result: MovieDataResult) => (
              <Link
                key={result.id}
                href={
                  result.media_type == "movie"
                    ? `/movies/${result.id}`
                    : `/tv/${result.id}`
                }
              >
                <div
                  className="item w-auto h-[280px] mr-[10px] flex relative sm:h-[210px] sm:mr-[8px]"
                  style={{ flex: "0 0 auto" }}
                >
                  <p className="list-number w-auto h-full center-div font-semibold text-[150px] font-[Lato,Lato-fallback,Arial,sans-serif] text-[#ffffff1e] sm:text-[100px]">
                    {listIterator++}
                  </p>
                  <div
                    className="
                  w-[200px] h-full overflow-hidden sm:w-[150px] relative translate-x-[-10px]"
                  >
                    <div className="mask group w-full h-full left-0 bottom-0 z-[2] from-[rgba(var(--background-color-1))] to-[#00000018] bg-gradient-to-t absolute center-div"></div>

                    <Image
                      className="object-cover rounded-md w-full h-full"
                      src={
                        props.imageOrientation == "landscape"
                          ? `https://themoviedb.org/t/p/original${result.poster_path}`
                          : `https://themoviedb.org/t/p/original${result.poster_path}`
                      }
                      width={130}
                      height={210}
                      quality={70}
                      alt=""
                    />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <>
              <LoadingUI iterator={1} />
              <LoadingUI iterator={2} />
              <LoadingUI iterator={3} />
              <LoadingUI iterator={4} />
              <LoadingUI iterator={5} />
              <LoadingUI iterator={6} />
              <LoadingUI iterator={7} />
              <LoadingUI iterator={8} />
              <LoadingUI iterator={9} />
              <LoadingUI iterator={10} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
