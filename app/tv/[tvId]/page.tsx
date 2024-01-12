import React from "react";
import Header from "@/app/components/Header";
import "@/app/dist/style/Header.css";

interface PageParams {
  params: {
    tvId: number;
  };
}

function page({ params }: PageParams) {
  return (
    <>
      <Header page={`watch-${params.tvId}`} />
      <iframe
        className="w-[600px]"
        src={`https://vidsrc.to/embed/tv/${params.tvId}/1`}
      ></iframe>
    </>
  );
}

export default page;
