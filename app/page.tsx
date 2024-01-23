import React from "react";
import Header from "./components/Header";
import MainCarousel from "./components/MainCarousel";
import TrendingToday from "./components/TrendingToday";

function Home() {
  return (
    <>
      <Header page="home" />
      <main>
        <MainCarousel />
        <div>
          <TrendingToday />
        </div>
      </main>
    </>
  );
}

export default Home;
