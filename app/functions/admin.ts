import axios from "axios";

export const uploadMovie = async (tmdb_id: string | null) => {
  try {
    const res = await axios.post(`/api/movies?id=${tmdb_id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteMovie = (tmdb_id: string) => {
  return axios.delete(`/api/movies/${tmdb_id}`);
}
