import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  query: string;
}

interface SearchResult {
  id: number;
  title: string;
  name: string;
  media_type: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date: string;
  first_air_date: string;
}
function LivesearchResult(props: Props) {
  //...
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    async function getSearchResult() {
      const res = await fetch(
        `https://api.thefloxtv.com/search/?q=${props.query}`,
        {
          cache: "no-cache",
        }
      );
      const data = await res.json();
      setSearchResult(data.results);
    }
    getSearchResult();
  }, [props.query]);

  if (props.query !== "" && searchResult) {
    return (
      <div className="SearchResult">
        {searchResult.map((result: SearchResult) => (
          <div className="wrapper">
            {result.media_type === "movie" ? (
              <Link href={`/movies/${result.tmdbMovie}`}>
                <div className="item">
                  <img
                    src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${result.bannerMovie}`}
                  />
                  <div className="info">
                    <p className="title">{result.titleMovie}</p>
                    <p className="sub">Movie &middot; {result.yearMovie}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link href={`/tv/${result.tmdbSeries}`}>
                <div className="item">
                  <img
                    src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${result.bannerSeries}`}
                  />
                  <div className="info">
                    <p className="title">{result.nameSeries}</p>
                    <p className="sub">Tv Show</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default LivesearchResult;
