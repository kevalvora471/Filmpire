import { useEffect, useState } from "react";
import './App.css';
import searchIcon from './assets/search.svg'
import MovieCard from "./components/MovieCard";
const API_URL = 'http://www.omdbapi.com?apikey=c032e2d7';
import { PuffLoader } from "react-spinners";

function App() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState([]);



  const searchMovies = async (title) => {
    setLoading(true);
    setMovies([]);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search)
    setLoading(false);
    setMovies(data.Search);
  }

  const handleKeyDown = (e) => {
    if(e.key == "Enter") {
      searchMovies(e.target.value)
    }
  };

  useEffect(() => {
    setLoading(true);
    searchMovies('avengers');
  }, [])

  return (
    <>
      <div className="app">
        <h1>FILMPIRE</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search movies"
            value={searchTerm}
            onKeyDown={handleKeyDown}
            onChange={(e) => { setSearchTerm(e.target.value) }}
          />
          <img
            src={searchIcon}
            alt="search"
            onClick={() => { searchMovies(searchTerm) }}
          />
        </div>
        {loading ? <PuffLoader color="#ccb7a6" /> : movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie, i) => (
                <MovieCard key={i} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No Movies found</h2>
            </div>
          )}

      </div>
    </>
  )
}

export default App
