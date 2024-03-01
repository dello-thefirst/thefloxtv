import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

interface Props {
  query: string;
}

type SearchResult = {
  status: string;
  id: number;
  title: string;
  name: string;
  media_type: string;
  poster_path: string;
  year: string;
  //...
  idMovie: number;
  idSeries: number;
  tmdbMovie: number;
  tmdbSeries: number;
  titleMovie: string;
  nameSeries: string;
  bannerMovie: string;
  bannerSeries: string;
  yearMovie: string;
};

const LivesearchResult = (props: Props) => {
  //...
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    async function getSearchResult() {
      try {
        const res = await axios.get(
          `https://floxapi.000webhostapp.com/search/?q=${props.query}`
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
          {searchResult.map((result: SearchResult) =>
            result.media_type == "movie" ? (
              <Link key={result.idMovie} href={`/movies/${result.id}`}>
                <div className="item">
                  <Image
                    src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${result.bannerMovie}`}
                    alt=""
                    width={40}
                    height={70}
                  />
                  <div className="info">
                    <p className="title">{result.titleMovie}</p>
                    <p className="sub">Movie &middot; {result.yearMovie}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link key={result.idSeries} href={`/tv/${result.id}`}>
                <div className="item">
                  <Image
                    src={`https://www.themoviedb.org/t/p/w94_and_h141_bestv2${result.bannerSeries}`}
                    alt=""
                    width={40}
                    height={70}
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
};

export default LivesearchResult;
