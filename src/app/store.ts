import { create } from "zustand";

type MovieStore = {
  id: number;
};

export const useStore = create<MovieStore>((set) => ({
  id: 0,
  mainColor: "lightgreen",
}));
