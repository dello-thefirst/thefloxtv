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

interface SearchResult {
  id: number;
  title: string;
  name: string;
  media_type: string;
  poster_path: string;
  year: string;
}

function LivesearchResult(props: Props) {
  //...
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    async function getSearchResult() {
      const res = await fetch(
        //`https://api.thefloxtv.com/search/?q=${props.query}`,
        `https://api.themoviedb.org/3/search/multi?query=${props.query}&include_adult=false&language=en-US&page=1&api_key=c19b8e28dc3c9d900ceb4696bf2d247c`,
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
              <Link key={result.id} href={`/movies/${result.id}`}>
                <div className="item">
                  <img
                    src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${result.poster_path}`}
                  />
                  <div className="info">
                    <p className="title">{result.title}</p>
                    <p className="sub">Movie &middot; 2020</p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link key={result.id} href={`/tv/${result.id}`}>
                <div className="item">
                  <img
                    src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${result.poster_path}`}
                  />
                  <div className="info">
                    <p className="title">{result.name}</p>
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
