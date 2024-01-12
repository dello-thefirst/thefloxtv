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
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=c19b8e28dc3c9d900ceb4696bf2d247c&query=${props.query}&include_adult=true&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setSearchResult(json.results);
      })
      .catch((error) => {
        console.log("error");
      });
  }, [props.query]);

  return (
    <div className="SearchResult" id="searchresult">
      {searchResult.map((result: SearchResult) => (
        <Link
          key={result.id}
          href={
            result.media_type === "movie"
              ? `/movies/${result.id}`
              : `/tv/${result.id}`
          }
        >
          <div className="item">
            <img
              src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${result.poster_path}`}
            />
            <div className="info">
              {result.media_type === "movie" ? result.title : result.name}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default LivesearchResult;
