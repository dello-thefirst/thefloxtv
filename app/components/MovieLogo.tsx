import React, { useState, useEffect } from "react";

interface Props {
  mediaType: string;
  movieId: number;
  movieTitle: string;
}

function MovieLogo(props: Props) {
  //..
  const [movieLogoData, setMovieLogoData] = useState(null);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${props.mediaType}/${props.movieId}/images?include_image_language=en&api_key=c19b8e28dc3c9d900ceb4696bf2d247c`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setMovieLogoData(json.logos[0] ? json.logos[0].file_path : "");
      });
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
