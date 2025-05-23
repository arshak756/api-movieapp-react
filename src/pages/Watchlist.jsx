import React, { useContext, useEffect, useState } from "react";
import { WatchListContext } from "../context/WatchListContext";
import Moviecard from "../components/Moviecard";

const Watchlist = () => {
  const { Watchlist } = useContext(WatchListContext);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=0bfd49c09ac504e42203c3655fd21170&language=en-US`
        );
        const data = await res.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Failed to fetch genres", error);
      }
    };

    fetchGenres();
  }, []);

  const filteredMovies = Watchlist.filter((movie) => {
    const titleMatch = (movie.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const genreMatch =
      selectedGenre === "" || movie.genre_ids?.includes(Number(selectedGenre));
    return titleMatch && genreMatch;
  });

  return (
    <div className="bg-red-600 pt-24 px-4 pb-12 max-w-full mx-auto min-h-screen">
      
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search your watchlist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        />
      </div>

      
      <div className="flex justify-center mb-10">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-full max-w-xs px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Moviecard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="text-center text-yellow-400 col-span-full mt-8 text-lg font-medium">
            No movies found in your watchlist.
          </p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
