import React from "react";
import Header from "@/app/components/Header";
import Image from "next/image";
import { getWordRange, getLetterRange } from "@/app/components/Functions";
import nullAvatar from "@/app/images/null-avatar.png";

const getMovieDetails = async (movieId: any) => {
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=credits`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
      },
    }
  );
  return request.json();
};

interface PageParams {
  params: {
    movieId: number;
  };
}

export default async function Movie({ params }: PageParams) {
  const movieData = await getMovieDetails(params.movieId);
  let hasStartedPlaying = false;
  // useEffect(() => {
  //   const getMovieDetails = async () => {
  //     try {
  //       setIsLoading(true);
  //       const res = await axios.get(
  //         `https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US&append_to_response=credits`,
  //         {
  //           headers: {
  //             Authorization:
  //               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
  //           },
  //         }
  //       );
  //       const response = [];
  //       response.push(res.data);
  //       setIsLoading(false);
  //       setMovieData(response);
  //     } catch (err) {
  //       console.log(err);
  //       getMovieDetails;
  //     }
  //   };
  //   getMovieDetails();
  // }, [params.movieId]);

  return (
    <>
      <Header page={`watch-${params.movieId}`} />
      <main className="main-container w-full">
        <div className="movie-container-screen w-full">
          <div className="screen w-full h-[80vh] sm:h-[180px] overflow-hidden mb-3 relative">
            {hasStartedPlaying ? (
              <iframe
                className="w-full h-full"
                id="playit"
                src={`https://vidsrc.to/embed/movie/${params.movieId}`}
                allowFullScreen
              ></iframe>
            ) : (
              <div className="thumbnail w-full h-full relative over-hidden">
                <Image
                  unoptimized
                  className="w-full h-full object-cover"
                  src={`https://media.themoviedb.org/t/p/w1000_and_h450_multi_faces${movieData.backdrop_path}`}
                  width={1200}
                  height={600}
                  alt=""
                />
                <div className="mask absolute top-0 left-0 w-full h-[100%] bg-gradient-to-t from-[var(--background-color-1)] to-black/60 flex items-center justify-center">
                  <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center cursor-pointer">
                    <i className="fa-solid fa-circle-play text-[var(--color-3)] text-[60px] sm:text-[40px]"></i>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <section className="w-full h-auto p-7 mt-5 sm:p-3">
          <div className="movie-details w-full h-auto flex gap-3">
            <div className="small-image-container w-[250px] h-[270px] rounded-lg overflow-hidden sm:hidden">
              <Image
                unoptimized
                className="w-full h-full object-cover"
                src={`https://themoviedb.org/t/p/w220_and_h330_face${movieData.poster_path}`}
                width={220}
                height={330}
                alt=""
              />
            </div>
            <div className="title-card text-semibold text-slate-200 w-full pr-[300px] sm:pr-5 flex flex-col gap-3">
              <p className="text-[30px] font-bold sm:text-[20px]">
                {movieData.title}
              </p>
              <div className="quick-info flex gap-3 items-center text-gray-500 ">
                <span className="w-auto px-[4px] py-[0.5px] text-[13px] sm:text-[10px] font-[800] text-black bg-[var(--color-3)] rounded-2xl">
                  HD
                </span>
                {movieData.genres.slice(0, 3).map((genre: any) => (
                  <span className="text-[13px] sm:text-[10px]" key={genre.id}>
                    {genre.name} &middot;
                  </span>
                ))}
                <span className="text-[13px] sm:text-[10px]">
                  {getLetterRange(movieData.release_date, 4)}
                </span>
              </div>
              <p className="description text-[17px] sm:text-[12px]">
                {getWordRange(movieData.overview, 25)}
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
              {movieData.credits.cast.slice(0, 10).map((cast: any) => (
                <div
                  key={cast.id}
                  className="item w-auto h-auto mr-[10px] flex flex-col items-center justify-center relative gap-3 sm:h-[210px] sm:mr-[8px]"
                  style={{ flex: "0 0 auto" }}
                >
                  <Image
                    unoptimized
                    className="w-[130px] h-[130px] sm:w-[100px] sm:h-[100px] rounded-2xl object-cover"
                    src={
                      cast.profile_path == null
                        ? nullAvatar
                        : `https://media.themoviedb.org/t/p/w240_and_h266_face/${cast.profile_path}`
                    }
                    width={130}
                    height={170}
                    alt="cast"
                  />
                  <p className="text-gray-300 text-[14px] sm:text-[12px]">
                    {cast.name}
                  </p>
                </div>
              ))}
              <div className="w-[200px] h-[130px] flex gap-2 items-center justify-center text-[var(--color-3)] text-[12px]">
                <p>View&nbsp;All</p>
                <i className="fa-regular fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
