import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [Watchlist, setWatchlist] = useState([]);

  const toggleWatchlist = (movie) => {
    const index = Watchlist.findIndex((m) => m.id === movie.id);

    if (index === -1) {
      
      setWatchlist([...Watchlist, movie]);
    } else {
      
      setWatchlist([
        ...Watchlist.slice(0, index),
        ...Watchlist.slice(index + 1),
      ]);
    }
  };

  return (
    <WatchListContext.Provider value={{ Watchlist, toggleWatchlist }}>
      {children}
    </WatchListContext.Provider>
  );
};



