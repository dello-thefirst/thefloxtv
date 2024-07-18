import axios from "axios";

export const fetchTrending = async (period: string | undefined) => {
  try {
    const req = await axios.get(
      `https://api.themoviedb.org/3/trending/all/${period}?language=en-US`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
        },
      }
    );
    return req.data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetails = async (movieId: any) => {
  try {
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=credits`,
      {
        method: "GET",
        cache: "force-cache",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
        },
      }
    );
    return request.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSeriesDetails = async (movieId: any) => {
  try {
    const request = await fetch(
      `https://api.themoviedb.org/3/tv/${movieId}?append_to_response=credits&language=en-US`,
      {
        method: "GET",
        cache: "force-cache",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
        },
      }
    );
    return request.json();
  } catch (error) {
    console.log(error);
  }
};
