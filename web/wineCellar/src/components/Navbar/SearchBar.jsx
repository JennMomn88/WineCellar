import { useState, useEffect } from 'react';
import * as API from '../../services/ApiService';
import { Link } from 'react-router';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.length < 2) {
      return;
    }

    setLoading(true);
    setError(null);

    const fetchWines = async () => {
      try {
        API.searchWines(query).then((resp) => {
          console.log(resp);
          setWines(resp);
        });
      } catch (err) {
        setError('Error al obtener los vinos');
        console.error('Error fetching wines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleWineClick = (wineId) => {
    window.location.href = `/wine/${wineId}`;
  };

  const shouldDisplayResults = query.length > 1 && !loading;

  return (
    <div className="relative flex justify-center items-center w-full max-w-xl h-12 text-gray-400 px-3 mx-auto z-50">
      <div className="relative w-full bg-gray-50 dark:bg-gray-600 text-black rounded-full text-lg hover:bg-gray-100 transition duration-200 shadow-md">
        <div className="flex items-center px-5 py-1">
          <span className="w-full">
            <input
              id="searchBar"
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search wine..."
              className="w-full bg-transparent text-md p-3 focus:outline-none placeholder:text-gray-400"
              autoComplete="off"
            />
          </span>
        </div>
      </div>

      <div
        id="searchResults"
        className={`absolute left-0 top-full w-full h-45 bg-white shadow-lg rounded-b-2xl border-t border-neutral-200 ${
          shouldDisplayResults ? '' : 'hidden'
        }`}
      >
        {loading && <div className="p-4 text-center">Loading...</div>}
        {error && <div className="p-4 text-center text-red-600">{error}</div>}
        {!loading && wines && wines.length > 0 && (
          <div className="p-4">
            <ul className="space-y-2">
              {wines.map((wine) => (
                <Link
                  key={wine.id}
                  to={`wine/${wine.id}`}
                  onClick={() => setQuery('')}
                >
                  <li className="p-2 hover:bg-gray-100 cursor-pointer">
                    {wine.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Quick links solo se muestran cuando empieces a teclear */}
      {/* <div
        className={`absolute left-0 top-full w-full bg-white shadow-lg rounded-b-2xl border-t border-neutral-200 mt-5 ${
          shouldDisplayQuickLinks ? '' : 'hidden'
        }`}
      >
        <div className="flex justify-between gap-4 p-4 bg-gray-50">
          <a href="#">
            <img
              className="h-10 w-10"
              src="src/assets/winesvg/red-wine-ChQAo9Sl.svg"
              alt="Red Wine"
            />
          </a>
          <a href="#">
            <img
              className="h-10 w-10"
              src="src/assets/winesvg/white-wine-CgYcQ8TX.svg"
              alt="White Wine"
            />
          </a>
          <a href="#">
            <img
              className="h-10 w-10"
              src="src/assets/winesvg/rose-wine-DtfDqwe3.svg"
              alt="Rosé Wine"
            />
          </a>

          <a href="#">
            <img
              className="h-10 w-10"
              src="src/assets/winesvg/sparkling-wine-BvQK52fv.svg"
              alt="Sparkling Wine"
            />
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default SearchBar;
