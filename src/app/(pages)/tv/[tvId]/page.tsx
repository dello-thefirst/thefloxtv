import React from "react";
import Header from "@/src/components/Header";
import Image from "next/image";
import { getWordRange, getLetterRange } from "@/src/components/Functions";
import nullAvatar from "@/src/app/images/null-avatar.png";
import type { Metadata } from "next";
import { getSeriesDetails } from "@/src/app/functions/fetch";
import SeriesScreen from "@/src/components/SeriesScreen";
import SeriesTrailers from "@/src/components/SeriesTrailers";
import Link from "next/link";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const id = params.tvId;
  const seriesData = await getSeriesDetails(id);
  const headerList = headers();
  const host = headerList.get("host");
  const host_name = host?.includes("thefloxtv") ? "Thefloxtv" : "Movieboxx";
  return {
    title: `Watch ${seriesData.name} Complete Series on ${host_name}`,
    description: seriesData.overview,
    openGraph: {
      type: "website",
      url: `https://${host_name}/tv/${id}`,
      title: seriesData.name,
      description: seriesData.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w220_and_h330_face${seriesData.poster_path}`,
        },
      ],
    },
  };
}

export default async function Series({ params }: { params: { tvId: string } }) {
  const seriesData = await getSeriesDetails(params.tvId);
  return (
    <>
      <Header page={`watch-${params.tvId}`} />
      <main className="main-container w-full">
        <SeriesScreen seriesData={seriesData} tvId={params.tvId} />

        <section className="w-full h-auto px-7 mt-2 sm:px-4">
          <div className="movie-details w-full h-auto flex gap-3">
            <div className="small-image-container w-[250px] h-[270px] rounded-lg overflow-hidden sm:hidden">
              <Image
                unoptimized
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/w220_and_h330_face${seriesData.poster_path}`}
                width={220}
                height={330}
                alt="Movie"
              />
            </div>
            <div className="title-card text-semibold text-slate-200 w-full pr-[10%] sm:pr-5 flex flex-col gap-3">
              <p className="text-[30px] font-bold sm:text-[25px]">
                {seriesData.name}
              </p>
              <div className="quick-info flex gap-3 items-center text-gray-500 ">
                <span className="w-auto px-[8px] py-[0.5px] text-[13px] sm:text-[11px] font-[600] text-gray-500  outline outline-1 outline-[var(--color-3)] rounded-sm">
                  HD
                </span>
                {seriesData.genres.slice(0, 3).map((genre: any) => (
                  <span className="text-[13px] sm:text-[11px]" key={genre.id}>
                    {genre.name} &middot;
                  </span>
                ))}
                <span className="text-[17px] sm:text-[11px] text-[var(--color-3)]">
                  {getLetterRange(seriesData.first_air_date, 4)}
                </span>
              </div>
              <p className="description text-[17px] sm:text-[11px]">
                {getWordRange(seriesData.overview, 25)}
              </p>
            </div>
          </div>
          {""}
          <div className="cast-container w-full h-auto mt-6">
            <p className="text-[30px] font-bold sm:text-[20px] text-white mb-4">
              Cast
            </p>{" "}
            <div
              className="scroll-container no-scrollbar"
              style={{
                display: "flex",
                flexWrap: "nowrap",
                width: "100%",
                height: "auto",
                overflowX: "scroll",
              }}
            >
              {seriesData.credits?.cast.slice(0, 7).map((cast: any) => (
                <div
                  key={cast.id}
                  className="item w-auto h-auto mr-[10px] flex flex-col items-center relative gap-3 sm:mr-[8px]"
                  style={{ flex: "0 0 auto" }}
                >
                  <Image
                    unoptimized
                    className="w-[130px] h-[130px] sm:w-[100px] sm:h-[100px] rounded-2xl object-cover"
                    src={
                      cast.profile_path == null
                        ? nullAvatar
                        : `https://media.themoviedb.org/t/p/w240_and_h266_face${cast.profile_path}`
                    }
                    width={130}
                    height={170}
                    loading="lazy"
                    alt="cast"
                  />
                  <p className="text-gray-300 text-[14px] sm:text-[12px]">
                    {getWordRange(cast.name, 2)}
                  </p>
                </div>
              ))}
              <Link
                target="_blank"
                href={`https://www.themoviedb.org/tv/${seriesData.id}/cast`}
              >
                <div className="w-[200px] h-[130px] sm:h-[100px] flex gap-2 items-center justify-center text-[var(--color-3)] text-[12px]">
                  <p>View&nbsp;All</p>
                  <i className="fa-regular fa-arrow-right"></i>
                </div>
              </Link>
            </div>
          </div>

          <SeriesTrailers
            trailers={seriesData.videos}
            seriesBanner={
              seriesData.images.backdrops[0]?.file_path ??
              seriesData.backdrop_path
            }
            seriesName={seriesData.name}
          />
        </section>
      </main>
    </>
  );
}
