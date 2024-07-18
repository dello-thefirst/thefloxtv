"use client";
import { useQuery } from "react-query";
import { fetchMovieTrailers } from "../functions/fetch";
import Link from "next/link";

export default function MovieTrailers({
  movieId,
  movieTitle,
}: {
  movieId: string;
  movieTitle: string;
}) {
  const { data, isLoading } = useQuery({
    queryFn: async () => await fetchMovieTrailers(movieId),
    queryKey: ["movietrailersf", movieId],
  });

  if (isLoading) {
    return;
  }
  return (
    <div className="cast-container w-full h-auto mt-6">
      <p className="text-[30px] font-bold sm:text-[20px] text-white mb-4">
        Trailers
      </p>
      <div
        className="scroll-container no-scrollbar"
        style={{
          display: "flex",
          flexWrap: "nowrap",
          width: "100%",
          height: "auto",
          gap: 20,
          overflowX: "scroll",
        }}
      >
        {data.results.map((trailer: any) => (
          <>
            <div>
              <iframe
                className="w-[400px] sm:w-[80vw] h-[240px] sm:h-[170px] rounded-xl sm:rounded-lg"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&mute=1`}
              ></iframe>
            </div>
          </>
        ))}{" "}
        <Link
          target="_blank"
          href={`https://www.youtube.com/results?search_query=${
            movieTitle + " Trailer"
          }`}
        >
          <div className="w-[400px] sm:w-[90vw] h-[240px] sm:h-[170px] rounded-xl sm:rounded-lg bg-gray-900 flex justify-center items-center cursor-pointer">
            <p className="text-[13px] text-[lightgreen] cursor-pointer">
              Other Trailers on Youtube{" "}
              <i className="fa-light fa-arrow-up-right-from-square"></i>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
