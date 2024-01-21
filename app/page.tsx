import React, { useRef, useState, useEffect } from "react";
import Header from "./components/Header";
import MainCarousel from "./components/MainCarousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "@/app/dist/style/App.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

function Home() {
  return (
    <>
      <Header page="home" />
      <main>
        <MainCarousel />
        <div></div>
      </main>
    </>
  );
}

export default Home;
