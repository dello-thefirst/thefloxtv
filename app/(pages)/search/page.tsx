"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Recent from "@/app/components/Recent";

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
