import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./components/MovieCard";

const apiUrl = "https://www.omdbapi.com?apikey=893b9508";
const movie1 = {
  Title: "xXx",
  Year: "2002",
  imdbID: "tt0295701",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BYjYwMzg4MTAtYTQ3NC00MjdlLWEzNGEtNzQwYzA3OGZmZWYyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
};
function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("avengers ");
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const SearchMovieBtn = () => {
    searchMovies(search);
  };

  return (
    <div className="app">
      <h1>Movie Lander</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={search}
          onChange={handleSearch}
        />
        <img src={SearchIcon} alt="search" onClick={SearchMovieBtn} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
