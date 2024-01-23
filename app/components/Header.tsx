"use client";
import React, { useState } from "react";
import LivesearchResult from "./LivesearchResult";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/logo.svg";
import "@/app/dist/style/Header.css";

interface HeaderProps {
  page: string;
}

function Header(props: HeaderProps) {
  //..
  const [searchValue, setSearchValue] = useState<string>("");
  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
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
          className={"focused search-bar center-div dropdown"}
          id="searchBar"
        >
          <form action="/search" method="GET" className="all-centered">
            <div className="search-rep-ico center-div">
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
            />
            <div className="search-rep-ico center-div"></div>
          </form>
          <div id="searchresult" tabIndex={0} className="dropdown-content">
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
              <li>
                <Link href="/movies">Trending</Link>
              </li>
              <Link href={"/search"}>
                <i className="fa-light fa-magnifying-glass nav-icon"></i>
              </Link>
              <Link href={"/account"}>
                <i className="fa-light fa-user-circle nav-icon"></i>
              </Link>
              <Link href={"/account"}>
                <i className="fa-light fa-bell nav-icon"></i>
              </Link>
              <Link href={"/account"}>
                <i className="fa-light fa-bars nav-icon"></i>
              </Link>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
