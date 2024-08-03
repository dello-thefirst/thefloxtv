import axios from "axios";
export const getMovieData = async (tmdb_id: string | null) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdb_id}?append_to_response=images%2Ctrailers&language=en`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getSeriesData = async (tmdb_id: string | null) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${tmdb_id}?append_to_response=images%2Ctrailers&language=en`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getExternalIds = async (tmdb_id: string | null) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${tmdb_id}/external_ids`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
        },
      }
    );
    return res.data;
  } catch (error) {
    return false;
  }
};

export const getTrendingList = async (
  period: string | null,
  type: string | null
) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/${period}?language=en-US`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTliOGUyOGRjM2M5ZDkwMGNlYjQ2OTZiZjJkMjQ3YyIsInN1YiI6IjY1MDA0ZDIwNmEyMjI3MDBjM2I2MDM3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DNP1HXf6xyRe_8C7rR7fljfalpmJZgcry6JN8xLwk8E",
        },
      }
    );
    return res.data.results;
  } catch (error) {
    return false;
  }
};
