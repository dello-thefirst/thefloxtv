import Link from "next/link";

export default function SeriesTrailers({
  trailers,
  seriesName,
  seriesBanner,
}: {
  trailers: any;
  seriesName: string;
  seriesBanner?: string;
}) {
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
        {trailers.results.slice(0, 1).map((trailer: any) => (
          <div
            className="w-[400px] sm:w-[70vw] h-[240px] sm:h-[150px] rounded-xl sm:rounded-lg overflow-hidden relative"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${seriesBanner})`,
              flex: "0 0 auto",
            }}
          >
            <div className="mask absolute top-0 left-0 w-full h-[100%] bg-[#3a3a3a8d] flex items-center justify-center">
              <div className="w-auo h-auto rounded-full bg-[#06040c] flex items-center justify-center cursor-pointer">
                <i className="fa-solid fa-circle-play text-[#fff] text-[60px] sm:text-[45px]"></i>
              </div>
            </div>
            {/* <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&mute=1`}
              ></iframe> */}
          </div>
        ))}
        <Link
          target="_blank"
          href={`https://www.youtube.com/results?search_query=${
            seriesName + " Trailer"
          }`}
        >
          <div
            style={{ flex: "0 0 auto" }}
            className="w-[400px] sm:w-[70vw] h-[240px] sm:h-[150px] rounded-xl sm:rounded-lg bg-gray-900 flex justify-center items-center cursor-pointer"
          >
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
