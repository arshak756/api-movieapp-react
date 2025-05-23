import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { WatchListContext } from "../context/WatchListContext";

const Navbar = () => {
  const { Watchlist } = useContext(WatchListContext);
  const location = useLocation();

  const linkClasses = (path) =>
    location.pathname === path
      ? "text-yellow-400 border-b-2 border-yellow-400"
      : "text-white hover:text-yellow-300";

  return (
    <nav className="bg-black fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-semibold text-white hover:text-yellow-400 transition"
        >
          Movie App
        </Link>

        <Link
          to="/watchlist"
          className={`relative font-medium text-lg ${linkClasses("/watchlist")} transition`}
        >
          Watchlist
          {Watchlist.length > 0 && (
            <span className="absolute -top-2 -right-5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {Watchlist.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

