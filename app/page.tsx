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
        <section className="px-[5%]">
          <p className="w-[50%] text-[40px] font-bold text-gray-200 my-[50px] line leading-[40px] sm:w-[90%] sm:text-[25px] sm:leading-[20px] sm:my-[30px]">
            Browse new, popular and upcoming movies & TV shows
          </p>
          <Trending period="day" type="movie" />
          <Trending period="day" type="tv" />
          <Recent type="series" />
          <Recent type="movies" />
          <p className="text-center font-sans text-green-400 font-normal text-[20px] sm:text-[12px]">
            Want more?
          </p>
          <Popular type="movies" />
          <Popular type="tv" />
        </section>
      </main>
    </>
  );
}

export default Home;
