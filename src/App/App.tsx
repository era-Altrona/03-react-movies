import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar  from "./components/SearchBar/SearchBar";
import MovieGrid  from "./components/MovieGrid/MovieGrid";
import Loader  from "./components/Loader/Loader";
import ErrorMessage  from "./components/ErrorMessage/ErrorMessage";
import MovieModal from "./components/MovieModal/MovieModal";
import fetchMovies from "./services/movieService";
import type {Movie} from "./types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setError(false);
      setLoading(true);

      const data = await fetchMovies(query);

      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data.results);
    } catch {
      setError(true);
      toast.error("Something went wrong...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
      
      {loading && <Loader />}
      {error && <ErrorMessage />}
      
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};