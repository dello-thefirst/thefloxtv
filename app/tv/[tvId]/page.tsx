import React from "react";
import Header from "@/app/components/Header";

interface PageParams {
  params: {
    tvId: number;
  };
}

function page({ params }: PageParams) {
  return (
    <>
      <Header page={`watch-${params.tvId}`} />
      <main>
        <div className="movie-container">
          <iframe
            className=""
            allowFullScreen
            src={`https://vidsrc.to/embed/tv/${params.tvId}`}
          ></iframe>
        </div>
      </main>
    </>
  );
}

export default page;
