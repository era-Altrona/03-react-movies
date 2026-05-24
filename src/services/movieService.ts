import type { AxiosResponse } from "axios";
import axios from "axios";
import type { TMDBResponse } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = "https://api.themoviedb.org/3";

export default async function fetchMovies(query: string): Promise<TMDBResponse> {
  const response: AxiosResponse<TMDBResponse> = await axios.get<TMDBResponse>("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  fetch("https://api.themoviedb.org/3/search/movie?query=test", {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
})
  .then(r => r.json())
  .then(console.log);

  return response.data;
}