import { useState, useEffect } from 'react';
import * as API from '../../services/ApiService';

const AddWineList = ({ setSelectedWine, cellarWines }) => {
  const [wines, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar todos los vinos disponibles solo cuando el usuario empiece a escribir
  useEffect(() => {
    if (searchTerm.length < 3) return;

    if (searchTerm.trim()) {
      setLoading(true);
      API.getWines()
        .then((data) => {
          setWines(data);
          setFilteredWines(
            data.filter((wine) =>
              wine.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        })
        .catch(() => setError('Error loading wines'))
        .finally(() => setLoading(false));
    } else {
      setFilteredWines([]);
    }
  }, [searchTerm]);

  const handleWineSelect = (wine) => {
    setSelectedWine(wine);
  };

  // Verificamos si el vino ya esta en la bodega del usuario
  const isWineInCellar = (wine) => {
    return cellarWines.some((cellarWine) => cellarWine.id === wine.id);
  };

  return (
    <div className="flex">
      {error && (
        <div className="w-full text-center text-red-500 p-4">{error}</div>
      )}

      <div className="w-1/2">
        <input
          type="text"
          className="w-80 p-2 bg-gray-50 border border-gray-300 rounded-full mx-auto block"
          placeholder="Search wines"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <div className="">Loading wines...</div>
        ) : (
          <ul className="list-none p-0 mt-5 overflow-x-hidden max-h-[400px] ">
            {filteredWines.length > 0 ? (
              filteredWines.map((wine) => (
                <li
                  key={wine.id}
                  onClick={() => handleWineSelect(wine)}
                  className="hover:dark:bg-neutral-700 hover:bg-secondary flex flex-row items-center h-20 w-full rounded-lg my-1 px-2 space-x-2 cursor-pointer focus:dark:bg-neutral-700 focus:outline-none hover:shadow-lg transition-all"
                >
                  {/* Imagen */}
                  <div className="w-16 h-16 rounded-lg flex self-center bg-black overflow-hidden mr-4">
                    <img
                      className="w-full h-full object-cover"
                      src={wine.image}
                      alt="Wine Image"
                    />
                  </div>

                  {/* Nombre del vino */}
                  <div className="font-medium text-left text-md mb-1 line-clamp-1 w-fit">
                    {wine.name}
                  </div>

                  {/* Descripción corta del vino */}
                  {wine.region && wine.country && (
                    <div className="dark:text-neutral-400 text-neutral-500 text-xs -mt-1 mb-2 w-fit">
                      {wine.region}, {wine.country}
                    </div>
                  )}

                  {/* Tipo de vino */}
                  <div className="flex flex-row space-x-2">
                    <span>
                      <span className="w-fit px-1 text-sm font-medium rounded-md bg-red-400 text-black">
                        {wine.winetype}
                      </span>
                    </span>
                  </div>

                  {/* Mensaje de "Ya está en la bodega" */}
                  {isWineInCellar(wine) && (
                    <span className="text-xl text-green-500 ml-2">&#9989;</span>
                  )}
                </li>
              ))
            ) : (
              <li className="text-center p-2 text-gray-500">No wines found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddWineList;
