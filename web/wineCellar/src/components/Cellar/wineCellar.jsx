import { useState } from 'react';
import WineFilters from './WineFilters';
import WineTable from './WineTable';
import UserCellarHeader from './UserCellarHeader';

const WineCellar = ({
  wines,
  error,
  loading,
  username,
  handleRemoveFromCellar,
}) => {
  const [filteredWines, setFilteredWines] = useState([]);

  // Función para aplicar filtros
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
  };

  return (
    <div className="bg-white shadow-lg rounded-xl w-full max-w-[90vw] min-h-[70vh] max-h-[90vh] mx-auto overflow-y-auto">
      {/* Agregar el encabezado de la bodega con el nombre del usuario */}
      <UserCellarHeader userName={username} />
      <WineFilters wines={wines} onFilterChange={applyFilters} />

      <WineTable
        filteredWines={filteredWines}
        loading={loading}
        error={error}
        isCellar={true}
        handleRemoveFromCellar={handleRemoveFromCellar}
      />
    </div>
  );
};

export default WineCellar;
