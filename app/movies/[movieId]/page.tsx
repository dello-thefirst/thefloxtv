import React from "react";
import Header from "@/app/components/Header";
import "@/app/dist/style/Header.css";

interface PageParams {
  params: {
    movieId: number;
  };
}

function page({ params }: PageParams) {
  return (
    <>
      <Header page={`watch-${params.movieId}`} />
      <iframe src={`https://vidsrc.to/embed/movie/${params.movieId}`}></iframe>
    </>
  );
}

export default page;
