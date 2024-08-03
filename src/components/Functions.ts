import React from "react";
export type MovieDataProps = {
  id: number;
  title: string;
  name: string;
  media_type: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date: string;
  first_air_date: string;
  duration: number;
  vote_average: number;
};

export function getWordRange(text: string, range: number) {
  const words = text.split(/\s+/);
  if (words.length > range) {
    const firstXWords = words.slice(0, range);
    const result = firstXWords.join(" ") + "... ";
    return result;
  } else {
    const result = text;
    return result;
  }
}

export function getLetterRange(text: string, range: number) {
  const letters = text.split("");
  const firstXLetters = letters.slice(0, range);
  const result = firstXLetters.join("");
  return result;
}
