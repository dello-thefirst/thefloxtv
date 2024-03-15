import React, { Suspense } from "react";
import Header from "./components/Header";
import MainCarousel from "./components/MainCarousel";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Recent from "./components/Recent";

function Home() {
  return (
    <>
      <Header page="home" />
      <main>
        <MainCarousel />
        <div>
          <Trending period="day" />
        </div>
        <div>
          <Recent type="series" />
        </div>
        <div>
          <Recent type="movies" />
        </div>

        <p className="text-center font-sans text-green-400 font-normal text-[20px] sm:text-[12px]">
          Want more?
        </p>
        <div className="popular-movies">
          <Popular type="movies" />
        </div>

        <div className="popular-series">
            <Popular type="tv" />
        </div>
      </main>
    </>
  );
}

export default Home;
