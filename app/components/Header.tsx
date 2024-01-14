"use client";
import React, { useState } from "react";
import LivesearchResult from "./LivesearchResult";
import Link from "next/link";
import Image from "next/image";
import Logo from "../logo.svg";
import "@/app/dist/style/Header.css";

interface HeaderProps {
  page: string;
}

function Header(props: HeaderProps) {
  //..
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchFocus, setSearchFocus] = useState(0);
  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    console.log(searchValue);
    setSearchValue(inputValue);
  };

  return (
    <>
      <header className={props.page === "home" ? "home-page-header" : ""}>
        <div className="logo-cont center-div">
          <Link href="/">
            <Image className="logo" src={Logo} alt="Logo" />
          </Link>
        </div>
        <div
          tabIndex={0}
          onBlur={() => {
            setSearchFocus(0);
          }}
          onFocus={() => {
            setSearchFocus(1);
          }}
          className={
            searchFocus == 1
              ? "focused search-bar center-div"
              : "search-bar center-div"
          }
          id="searchBar"
        >
          <form action="/search" method="GET" className="all-centered">
            <div className="search-rep-ico center-div">
              <i className="fa-regular fa-magnifying-glass"></i>
            </div>
            <input
              autoComplete="off"
              id="searchInput"
              type="text"
              name="q"
              placeholder="Search Movies and Tv Shows"
              onChange={search}
            />

            <div className="search-rep-ico all-centered">
              <i className="bi bi-funnel"></i>
            </div>
          </form>
          <div id="searchresult">
            <LivesearchResult query={searchValue} />
          </div>
        </div>

        <div className="right-section center-div">
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/tvshows">TV Shows</Link>
              </li>
              <li>
                <Link href="/movies">Movies</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
