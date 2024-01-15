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
          onBlur={() => {
            setSearchFocus(0);
          }}
          onFocus={() => {
            setSearchFocus(1);
          }}
          className={"focused search-bar center-div dropdown"}
          id="searchBar"
        >
          <form
            tabIndex={0}
            role="button"
            action="/search"
            method="GET"
            className="all-centered"
          >
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
            </ul>
          </nav>

          <div className="icons">
            <div className="toggle-nav">
              <label className="swap swap-rotate">
                <input type="checkbox" />
                <svg
                  className="swap-off fill-current"
                  fill="#ffffff"
                  viewBox="0 0 64 64"
                  data-name="Layer 1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title></title>
                    <path d="M53,24.34H11.05a2,2,0,0,1,0-4H53a2,2,0,0,1,0,4Z"></path>
                    <path d="M53,43.66H41.5a2,2,0,0,1,0-4H53a2,2,0,0,1,0,4Z"></path>
                    <path d="M32.82,43.66H11.05a2,2,0,1,1,0-4H32.82a2,2,0,0,1,0,4Z"></path>
                  </g>
                </svg>
                <svg
                  className="swap-on fill-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
