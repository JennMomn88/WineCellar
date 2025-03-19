import { useState, useEffect } from 'react';
import WineFilters from '../Cellar/WineFilters';
import WineTable from '../Cellar/WineTable';

const ITEMS_PER_PAGE = 10;

const WinePageComponent = ({ wines, error, loading }) => {
  const [filteredWines, setFilteredWines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilteredWines(wines);
  }, [wines]);

  const indexOfLastWine = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstWine = indexOfLastWine - ITEMS_PER_PAGE;
  const currentWines = filteredWines.slice(indexOfFirstWine, indexOfLastWine);
  const totalPages = Math.ceil(filteredWines.length / ITEMS_PER_PAGE);

  const applyFilters = ({ searchQuery, wineType, country, sortOption }) => {
    let updatedWines = [...wines];

    if (searchQuery) {
      updatedWines = updatedWines.filter((wine) =>
        wine.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (wineType) {
      updatedWines = updatedWines.filter((wine) => wine.winetype === wineType);
    }

    if (country) {
      updatedWines = updatedWines.filter((wine) => wine.country === country);
    }

    if (sortOption === 'priceAsc') {
      updatedWines.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      updatedWines.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
      updatedWines.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredWines(updatedWines);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl w-full max-w-[90vw] min-h-[70vh] max-h-[90vh] mx-auto overflow-y-auto">
      <WineFilters wines={wines} onFilterChange={applyFilters} />
      <WineTable filteredWines={currentWines} loading={loading} error={error} />

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 text-black rounded-full transition-all disabled:opacity-50"
        >
          &#8592;
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
              ${
                currentPage === pageNumber
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black'
              }
              hover:bg-black hover:text-white`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-black rounded-full transition-all disabled:opacity-50"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default WinePageComponent;
