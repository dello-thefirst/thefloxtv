import React from "react";
import Header from "@/app/components/Header";

interface PageParams {
  params: {
    movieId: number;
  };
}

function page({ params }: PageParams) {
  return (
    <>
      <Header page={`watch-${params.movieId}`} />
      <div style={{ width: "600px", height: "350px" }}>
        <iframe
          style={{ width: "100%", height: "100%" }}
          id="playit"
          src={`https://vidsrc.to/embed/movie/${params.movieId}`}
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}

export default page;
