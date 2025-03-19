import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../services/ApiService';

const calculateDrinkWindow = (wine) => {
  const { year, winetype } = wine;

  let startYear, endYear;

  if (winetype === 'Blanco') {
    startYear = year + 1;
    endYear = year + 5;
  } else if (winetype === 'Tinto') {
    startYear = year + 1;
    endYear = year + 10;
  } else if (winetype === 'Rosado') {
    startYear = year;
    endYear = year + 2;
  } else {
    return 'No disponible';
  }

  return `${startYear} - ${endYear}`;
};

const WineTable = ({
  filteredWines,
  loading,
  error,
  handleRemoveFromCellar,
  isCellar = false,
}) => {
  if (loading) {
    return <p className="text-center text-gray-500">Loading wines...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="relative bg-white w-full h-full">
      {/* Table Header */}
      <div className="w-full h-[45px] flex border-b-[1px] border-b-[#d4d4d4]">
        {/* Primer encabezado vacío */}
        <div className="w-[200px] flex items-center font-medium text-[#737373] px-3 text-start">
          {/* Primer encabezado vacío */}
        </div>

        {/* Los demás encabezados */}
        <div className="w-[200px] flex items-center font-medium text-[#737373] px-3 text-start">
          Wine Name
        </div>
        <div className="w-[150px] flex items-center font-medium text-[#737373] px-3 text-start">
          Label
        </div>
        <div className="w-[150px] flex items-center font-medium text-[#737373] px-3 text-start">
          Winery
        </div>
        <div className="w-[120px] flex items-center font-medium text-[#737373] px-3 text-start">
          Country
        </div>
        <div className="w-[120px] flex items-center font-medium text-[#737373] px-3 text-start">
          Winetype
        </div>
        <div className="w-[120px] flex items-center font-medium text-[#737373] px-3 text-start">
          Price
        </div>
        <div className="w-[120px] flex items-center font-medium text-[#737373] px-3 text-start">
          Avb
        </div>
        <div className="w-[150px] flex items-center font-medium text-[#737373] px-3 text-start">
          Drink Window
        </div>
        {isCellar && (
          <div className="w-[100px] flex items-center font-medium text-[#737373] px-3 text-start">
            Actions
          </div>
        )}
      </div>

      {/* Table Body */}
      <div className="overflow-auto w-full h-full relative min-w-0 flex-1 basis-auto border-b-[1px] border-b-neutral-300 hide-scrollbar">
        <div className="h-full relative">
          {/* Data Rows */}
          {!filteredWines.length && (
            <div className="text-2xl font-semibold text-center text-gray-600 py-4">
              Empty Cellar
            </div>
          )}
          {filteredWines.map((wine) => (
            <Link
              key={wine.id}
              to={`/wine/${wine.id}`}
              className="flex items-center h-[130px] border-b border-b-neutral-200"
            >
              <div className="w-[200px] px-3 text-start">
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="w-20 h-20 object-cover rounded-lg transform transition-all duration-300 hover:scale-110"
                />
              </div>

              <div className="w-[200px] px-3 text-start font-semibold">
                {wine.name}
              </div>
              <div className="w-[150px] px-3 text-start text-gray-500">
                {wine.label !== 'false' ? (
                  <div className="label-svg">
                    <img
                      src={wine.label}
                      alt="Wine Label"
                      className="w-10 h-10"
                    />
                  </div>
                ) : (
                  'No O.D.'
                )}
              </div>
              <div className="w-[150px] px-3 text-start text-gray-500">
                {wine.winery}
              </div>
              <div className="w-[120px] px-3 text-start text-gray-500">
                {wine.country}
              </div>
              <div className="w-[120px] px-3 text-start">{wine.winetype}</div>
              <div className="w-[120px] px-3 text-start text-green-600">
                {wine.price} €
              </div>

              <div className="w-[120px] px-3 text-start">{wine.avb}%</div>
              <div className="w-[150px] px-3 text-start text-gray-500">
                {calculateDrinkWindow(wine)}
              </div>
              {isCellar && (
                <div className="w-[100px] px-3 text-start font-semibold">
                  <button
                    className="btn bg-red-500 rounded-3xl p-3 text-white hover:bg-red-700"
                    onClick={(event) => {
                      event.preventDefault();
                      handleRemoveFromCellar(wine.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WineTable;
