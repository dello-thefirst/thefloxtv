import React from "react";
import Header from "@/app/components/Header";
import Main from "@/app/components/Main";
import Trending from "@/app/components/Trending";
import Popular from "@/app/components/Popular";
import DiscoverDaily from "@/app/components/DiscoverDaily";

function Home() {
  return (
    <>
      <Header page="home" />
      <main>
        <Main />
        <section className="px-[5%]">
          <DiscoverDaily />
          <p className="w-[50%] text-[40px] font-bold text-gray-200 my-[50px] line leading-[40px] sm:w-[90%] sm:text-[25px] sm:leading-[30px] sm:my-[40px]">
            Browse new, popular and upcoming movies & TV shows
          </p>
          <Trending period="week" type="movie" />
          <Trending period="week" type="tv" />
          {/* <Recent type="tv" />
          <Recent type="movies" /> */}
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
