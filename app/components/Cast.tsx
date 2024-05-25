"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
export default function Cast({ id, type }: { id?: string; type?: string }) {
  useEffect(() => {
    const getCastDetails = async () => {
      try {
        const res = axios.get(
          `https://api.themoviedb.org/3/movie/614933/credits`
        );
      } catch (err) {
        console.error(err);
      }
    };
    getCastDetails();
  }, [id, type]);
  return (
    <>
      <div>
        <div></div>
      </div>
    </>
  );
}
