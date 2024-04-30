"use client";
import React, { useState } from "react";
import LivesearchResult from "./LivesearchResult";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/logo.svg";

function Header({ page }: { page?: string }) {
  //..
  const [searchValue, setSearchValue] = useState<string>("");
  const [isToggledNav, setIsToggledNav] = useState(false);
  const [isSearchToggled, setIsSearchToggled] = useState(false);

  function toggleSideNav() {
    if (isToggledNav) setIsToggledNav(false);
    else setIsToggledNav(true);
  }

  function toggleSearchBar() {
    if (isSearchToggled) setIsSearchToggled(false);
    else setIsSearchToggled(true);
  }
  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
  };

  return (
    <>
      <div
        className={`w-full h-screen bg-black bg-opacity-75 fixed top-0 left-0 z-30 p-[10%] ${
          isToggledNav ? "translate-x-0" : "translate-x-[-100%]"
        } transition-all duration-300`}
      >
        <i
          onClick={toggleSideNav}
          className="fa-solid fa-xmark-large absolute right-[10%]"
        ></i>
        <nav className="w-full h-full center-div">
          <ul className="text-[18px] font-light text-[b8b8b8] flex flex-col gap-[30px] text-center">
            <li className="">
              <Link href="/">Home</Link>
            </li>
            <li className="">
              <Link href="/tvshows">TV Shows</Link>
            </li>
            <li className="">
              <Link href="/movies">Movies</Link>
            </li>
            <li className="">
              <Link href="/movies">Trending</Link>
            </li>
          </ul>
        </nav>
      </div>
      <header
        className={`w-full h-[80px] sm:h-[60px] px-[3%] ${
          page == "home" && "absolute z-10"
        } bg-gradient-to-b from-[rgba(var(--background-color-1))]/90 to-transparent`}
      >
        <div className="logo-cont w-auto h-full float-left center-div">
          <Link href="/">
            <Image className="logo w-[120px]" src={Logo} alt="Logo" />
          </Link>
        </div>

        <div
          className={`focused search-bar center-div dropdown w-[40%] h-full float-left mx-[20px] relative sm:fixed sm:w-full sm:top-0 sm:right-0 sm:mx-0 sm:items-start sm:py-[90px] sm:px-5 sm:bg-gray-700/20 sm:backdrop-blur-md ${
            !isSearchToggled ? "sm:hidden" : ""
          }`}
          id="searchBar"
        >
          <div className="hidden sm:block  text-white absolute top-5 right-5 text-[15px]">
            <i
              className="fa-regular fa-xmark-large"
              onClick={toggleSearchBar}
            ></i>
          </div>
          <form
            action="/search"
            method="GET"
            className="center-div w-full h-[34px] sm:h-[40px] flex rounded-md sm:rounded-2xl bg-[#c8c8c821] sm:bg-black shadow-2xl shadow-gray-950 backdrop-blur-[70px]"
          >
            <div className="search-rep-ico center-div w-[8%] sm:w-[12%] h-full text-[13px] text-gray-400">
              <i className="fa-light fa-magnifying-glass"></i>
            </div>
            <input
              tabIndex={0}
              autoComplete="off"
              id="searchInput"
              type="text"
              name="q"
              placeholder="Search Movies and Tv Shows"
              onChange={search}
              className="w-[92%] h-full bg-transparent border-none outline-none text-white text-[12px] font-normal pl-[10px] text-center  "
            />
            <div className="search-rep-ico center-div w-[8%] h-full text-[13px] text-gray-400"></div>
          </form>
          <div
            id="searchresult"
            tabIndex={0}
            className="dropdown-content w-full max-h-[50vh] absolute top-[50px] left-0 overflow-y-scroll shadow-2xl overflow-x-hidden bg-[rgb(var(--background-color-2), 0.2)] backdrop-blur-[60px] rounded-md px-[5%] sm:bg-black z-[10] sm:static sm:top-[150px] sm:z-0 sm:w-[90%] sm:left-[5%] sm:rounded-2xl sm:max-h-[70vh] sm:py-2"
          >
            <LivesearchResult query={searchValue} />
          </div>
        </div>

        <div className="right-section center-div float-right h-full flex">
          <nav className="nav w-full">
            <ul className="w-full flex justify-between gap-[25px] tracking-wider md:hidden">
              <li className="text-[12px] font-light text-[#d0cece]">
                <Link href="/">Home</Link>
              </li>
              <li className="text-[12px] font-light text-[#d0cece]">
                <Link href="/tvshows">TV Shows</Link>
              </li>
              <li className="text-[12px] font-light text-[#d0cece]">
                <Link href="/movies">Movies</Link>
              </li>
              <li className="text-[12px] font-light text-[#d0cece]">
                <Link href="/movies">Trending</Link>
              </li>
            </ul>
          </nav>

          <nav className="md-nav hidden pr-[5%] md:block">
            <ul className="w-full flex justify-between gap-[25px]">
              <i
                className="fa-light fa-magnifying-glass nav-icon text-white text-[18px]"
                onClick={toggleSearchBar}
              ></i>
              <i
                className="fa-light fa-bars nav-icon text-white text-[18px]"
                onClick={toggleSideNav}
              ></i>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
