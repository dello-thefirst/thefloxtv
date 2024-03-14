"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import "@/app/dist/style/App.css";
import Recent from "../components/Recent";

function Search() {
  return (
    <>
      <Header page="search" />
      <main>
        <div>
          <Recent type="movies" />
        </div>
      </main>
    </>
  );
}

export default Search;
