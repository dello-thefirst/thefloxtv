import React, { useState, useEffect } from "react";

interface Props {
  mediaType: string;
  movieId: number;
  movieTitle?: string;
}

function MovieLogo(props: Props) {
  //...
  const [movieLogoData, setMovieLogoData] = useState(null);
  useEffect(() => {
    async function getMovieLogo() {
      const res = await fetch(
        `https://api.themoviedb.org/3/${props.mediaType}/${props.movieId}/images?include_image_language=en&api_key=c19b8e28dc3c9d900ceb4696bf2d247c`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setMovieLogoData(data.logos[0] ? data.logos[0].file_path : "");
    }
    getMovieLogo();
  }, []);

  if (movieLogoData && movieLogoData !== "")
    return (
      <img
        className="movie-logo"
        src={`https://www.themoviedb.org/t/p/w500/${movieLogoData}`}
      />
    );
  return <p className="title">{props.movieTitle}</p>;
}

export default MovieLogo;
