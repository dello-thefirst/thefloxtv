import React from "react";
import Header from "./components/Header";
import MainCarousel from "./components/MainCarousel";
import Trending from "./components/Trending";

function Home() {
  return (
    <>
      <Header page="home" />
      <main>
        <MainCarousel />
        <div>
          <Trending period="week" />
          <Trending period="day" />
        </div>
      </main>
    </>
  );
}

export default Home;
