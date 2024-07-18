import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { getLetterRange } from "./Functions";

const LivesearchResult = (props: { query: string }) => {
  //...
  const [searchResult, setSearchResult] = useState<any>([]);
  useEffect(() => {
    async function getSearchResult() {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/multi?query=${props.query}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
            },
          }
        );

        setSearchResult(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSearchResult();
  }, [props.query]);

  if (props.query !== "" && searchResult && props.query !== " ") {
    return (
      <div className="SearchResult">
        <div className="wrapper">
          {searchResult.results
            .filter(
              (movie: any) =>
                movie.popularity > 10 && // Adjust threshold as needed
                movie.vote_average > 7 && // Minimum rating
                movie.vote_count > 100 // Minimum number of votes
            )
            .map((result: any) => (
              <Link
                key={result.id}
                href={
                  result.media_type == "movie"
                    ? `/movies/${result.id}`
                    : `/tv/${result.id}`
                }
              >
                <div className="item flex gap-[10px] my-[10px]">
                  <Image
                    className="w-[40px]  h-[50px] rounded-sm object-cover"
                    src={`https://themoviedb.org/t/p/w94_and_h141_bestv2${
                      result.media_type == "movie"
                        ? result.backdrop_path
                        : result.backdrop_path
                    }`}
                    alt=""
                    width={40}
                    height={70}
                  />
                  <div className="info text-[13px]">
                    <p className="title">
                      {result.media_type == "movie"
                        ? result.title
                        : result.name}
                    </p>
                    <p
                      className="sub text-green-300 text-[11px] font-light"
                      style={{ wordSpacing: "3px" }}
                    >
                      {result.media_type == "movie" ? `Movie ` : `TV `}
                      &middot; &nbsp;
                      {result.media_type == "movie"
                        ? getLetterRange(result.release_date, 4)
                        : getLetterRange(result.first_air_date, 4)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    );
  }
};

export default LivesearchResult;
