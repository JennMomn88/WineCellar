import React, { useEffect, useState } from 'react';
import * as API from '../../services/ApiService';

const LatestAddedWines = () => {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getLatestWines()
      .then((x) => {
        console.log(x);
        setWines(x);
      })
      .catch((error) => {
        console.error('Error fetching analytics:', error);
        setError('Error al cargar los datos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex w-full max-w-screen-sm mx-auto">
      <div className="space-y-3 w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-neutral-500 font-medium py-4">
            Últimos añadidos
          </h2>
          <a
            href="/winepage"
            className="flex py-4 h-full text-sm items-center text-info hover:text-neutral-400 transition duration-300 font-medium gap-2"
          >
            See all
            <svg
              viewBox="0 0 24 24"
              width="1.2em"
              height="1.2em"
              className="w-5"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </a>
        </div>
        {/* Grid Section */}
        <div className="grid grid-flow-col auto-cols-fr object-contain grid-rows-1 h-64 gap-3">
          {loading ? (
            <div className="text-sm text-gray-400">Cargando datos...</div>
          ) : error ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : (
            wines.map((wine) => (
              <a
                key={wine.id}
                href={`/wine/${wine.id}`}
                title={`${wine.name} - ${wine.winery}`}
                className="relative grid  grid-rows-subgrid object-contain supports-[not(grid-template-rows:subgrid)]:grid-rows-1 row-[span_3] gap-2 bg-white bg-cover bg-center rounded-2xl overflow-clip px-3 pb-3 shadow-sm text-xs text-white z-0"
                style={{ backgroundImage: `url(${wine.image})` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black to-transparent z-[-1]"></div>
                <div className="flex relative justify-center"></div>
                <div className="text-sm font-semibold line-clamp-3">
                  {`${wine.year} - ${wine.name} - ${wine.winery}`}
                </div>
                <div className="text-sm">
                  {`Added ${new Date(wine.updatedAt).toLocaleDateString()}`}
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestAddedWines;
