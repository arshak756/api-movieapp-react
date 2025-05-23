import { useEffect, useState, useRef } from "react";
import Moviecard from "../components/Moviecard";

const API_KEY = "0bfd49c09ac504e42203c3655fd21170";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      fetchMovies(1, search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (page === 1) return;
    fetchMovies(page, search);
  }, [page]);

  const fetchMovies = (pageNum, query) => {
    let url = `https://api.themoviedb.org/3/movie/upcoming?page=${pageNum}&api_key=${API_KEY}`;
    if (query.trim()) {
      url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&page=${pageNum}&api_key=${API_KEY}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setMovies([]);
      });
  };

  return (
    <div className="min-h-screen bg-red-600 p-6 pt-24">
      <input
        type="text"
        placeholder="Search For Movies"
        className="block mx-auto mb-8 w-full max-w-lg rounded-lg border border-gray-600 bg-slate-200 bg-opacity-70 px-4 py-3 text-lg font-semibold text-black placeholder-gray-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={searchRef}
      />

      <div className="movies-container grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.length > 0 ? (
          movies.map((movie) => <Moviecard key={movie.id} movie={movie} />)
        ) : (
          <p className="col-span-full text-center text-lg font-medium text-yellow-400">
            No movies found.
          </p>
        )}
      </div>

      <div className="pagination-container mt-10 flex justify-center gap-6">
        <button
          disabled={page === 1}
          className={`rounded-md px-6 py-3 font-semibold transition 
            ${
              page === 1
                ? "cursor-not-allowed bg-gray-700 text-gray-400"
                : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
            }`}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <button
          disabled={page === totalPages}
          className={`rounded-md px-6 py-3 font-semibold transition 
            ${
              page === totalPages
                ? "cursor-not-allowed bg-gray-700 text-gray-400"
                : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
            }`}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
