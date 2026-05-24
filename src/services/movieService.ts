import type { AxiosResponse } from "axios";
import axios from "axios";
import type { Movie } from "../types/movie";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = "https://api.themoviedb.org/3";

interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export default async function fetchMovies(query: string): Promise<TMDBResponse> {
  const response: AxiosResponse<TMDBResponse> = await axios.get<TMDBResponse>("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return response.data;
}