import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  query?: string;
}

interface SearchResult {
  tmdbMovie: number;
  tmdbSeries: number;
  titleMovie: string;
  nameSeries: string;
  media_type: string;
  bannerMovie: string;
  bannerSeries: string;
  yearMovie: string;
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
        <div className="wrapper">
          {searchResult.map((result: SearchResult) =>
            result.media_type == "movie" ? (
              <Link key={result.tmdbMovie} href={`/movies/${result.tmdbMovie}`}>
                <div className="item">
                  <img
                    src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${result.bannerMovie}`}
                  />
                  <div className="info">
                    <p className="title">{result.titleMovie}</p>nj 
                    <p className="sub">Movie &middot; {result.yearMovie}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link key={result.tmdbSeries} href={`/tv/${result.tmdbSeries}`}>
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
            )
          )}
        </div>
      </div>
    );
  }
}

export default LivesearchResult;
