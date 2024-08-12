"use client";
import { create } from "zustand";

type MovieStore = {
  id: number;
  host: string;
};

export const useStore = create<MovieStore>((set) => ({
  id: 0,
  mainColor: "lightgreen",
  host: typeof window !== "undefined" ? window.location.hostname : "localhost",
}));
