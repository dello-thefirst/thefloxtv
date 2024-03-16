"use client";
import React, { useState } from "react";
import LivesearchResult from "./LivesearchResult";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/logo.svg";

function Header({ page }: { page?: string }) {
  //..
  const [searchValue, setSearchValue] = useState<string>("");
  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
  };

  return (
    <>
      <header
        className={`w-full h-[60px] px-[3%] ${
          page == "home" && "absolute z-[20]"
        } px-[5%]`}
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(var(--background-color-1), 1), rgba(var(--background-color-1), 0.7), rgba(var(--background-color-1), 0.3), rgba(0, 0, 0, 0));",
        }}
      >
        <div className="logo-cont w-auto h-full float-left center-div">
          <Link href="/">
            <Image className="logo w-[120px]" src={Logo} alt="Logo" />
          </Link>
        </div>

        <div
          className={
            "focused search-bar center-div dropdown w-[40%] h-full float-left mx-[20px] relative sm:hidden"
          }
          id="searchBar"
        >
          <form
            action="/search"
            method="GET"
            className="center-div w-full h-[34px] flex rounded-md bg-[#7c7c7c2c] drop-shadow-xl backdrop-blur-[30px]"
          >
            <div className="search-rep-ico center-div w-[8%] h-full text-[13px] text-gray-400">
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
            className="dropdown-content w-full max-h-[50vh] absolute top-[50px] left-0 overflow-y-scroll overflow-x-hidden bg-[rgb(var(--background-color-2), 0.2)] backdrop-blur-[60px] rounded-md px-[5%] z-[10]"
          >
            <LivesearchResult query={searchValue} />
          </div>
        </div>

        <div className="right-section center-div w-[20%] float-right h-full flex">
          <nav className="w-ful sm:hidden">
            <ul className="w-full flex justify-between">
              <li className="text-[12px] font-light text-[b8b8b8]">
                <Link href="/">Home</Link>
              </li>
              <li className="text-[12px] font-light text-[b8b8b8]">
                <Link href="/tvshows">TV Shows</Link>
              </li>
              <li className="text-[12px] font-light text-[b8b8b8]">
                <Link href="/movies">Movies</Link>
              </li>
              <li className="text-[12px] font-light text-[b8b8b8]">
                <Link href="/movies">Trending</Link>
              </li>
            </ul>
          </nav>
          <nav className="sm-nav hidden sm:block">
            <ul className="w-full flex justify-between gap-[20px]">
              <Link href={"/search"}>
                <i className="fa-light fa-magnifying-glass nav-icon text-[b8b8b8] text-[13px]"></i>
              </Link>
              <Link href={"/account"}>
                <i className="fa-light fa-user-circle nav-icon text-[b8b8b8] text-[13px]"></i>
              </Link>
              <Link href={"/account"}>
                <i className="fa-light fa-bell nav-icon text-[b8b8b8] text-[13px]"></i>
              </Link>
              <Link href={"/account"}>
                <i className="fa-light fa-bars nav-icon text-[b8b8b8] text-[13px]"></i>
              </Link>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
