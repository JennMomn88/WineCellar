import React from 'react';

const WineInfo = ({ wine, wineInCellar, onAddToCellar, similarWines }) => {
  return (
    <>
      <div
        className="w-screen mt-45 h-auto flex flex-col items-center justify-center p-6 pt-20"
        style={{
          backgroundImage: '',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left',
          backgroundSize: 'cover',
        }}
      >
        <h1 className="text-2xl font-bold">Wine Details</h1>
        {/* Contenedor del vino principal */}
        <div className="max-w-6xl mt-5 w-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row text-black">
          {/* Imagen del Vino */}
          <div
            className="w-full md:w-1/2 h-96 bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(${wine.image})`,
              backgroundSize: 'contain',

              backgroundPosition: 'center',
            }}
          ></div>

          {/* Información del Vino */}
          <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold">{wine.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{wine.winetype}</p>
              {/* Precio y país */}
              <p className="text-xl text-gray-700 mt-2">
                {wine.price} € - {wine.country}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col text-center">
                <span className="text-sm text-gray-400">Alcohol Content</span>
                <span className="text-xl font-semibold">{wine.Avb}%</span>
              </div>
              <div className="flex flex-col text-center">
                <span className="text-sm text-gray-400">Region</span>
                <span className="font-semibold">{wine.city}</span>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <div className="flex-1 text-center">
                <h3 className="text-sm font-semibold">Region</h3>
                {wine.label === 'false' ? (
                  <span className="text-sm text-gray-400">--</span>
                ) : (
                  <img
                    src={wine.label}
                    alt="Etiqueta del vino"
                    className="w-16 h-16 mx-auto object-contain"
                  />
                )}
              </div>
              <div className="flex-1 text-center">
                <h3 className="text-sm font-semibold">Varietal</h3>
                <p className="text-sm text-gray-400">{wine.grapeVariety}</p>
              </div>
              <div className="flex-1 text-center">
                <h3 className="text-sm font-semibold">Producer</h3>
                <p className="text-sm text-gray-400">{wine.winery}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-center items-center">
              {wineInCellar ? (
                <p className="text-emerald-900 font-semibold text-center">
                  Este vino ya está en tu bodega
                </p>
              ) : (
                <button
                  onClick={onAddToCellar}
                  className="transition-background duration-200 justify-items-end text-center h-10 px-4 gap-2 py-2 paragraph-2 inline-flex rounded-full text-sm sm:text-base cursor-pointer border border-transparent bg-black text-white hover:bg-neutral-600"
                >
                  Add My Cellar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Descripciok*/}
        <div className="max-w-6xl w-full bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">About {wine.name}</h2>
          <p className="text-sm text-gray-700">{wine.description}</p>
        </div>

        <div className="mt-10 flex justify-center w-full">
          <div className="max-w-6xl w-full bg-white shadow-md rounded-lg p-6 overflow-x-auto">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Vinos Similares
            </h2>

            <div className="flex justify-center space-x-6">
              {similarWines && similarWines.length > 0 ? (
                similarWines.map((similarWine) => (
                  <a
                    key={similarWine.id}
                    href={`/wine/${similarWine.id}`}
                    className="flex flex-col w-40 hover:bg-gray-100 transition-all"
                  >
                    <div className="bg-white rounded-lg p-4">
                      <div
                        className="h-40 bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url(${similarWine.image})` }}
                      ></div>
                      <h3 className="mt-4 text-lg font-semibold">
                        {similarWine.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {similarWine.type}
                      </p>
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-center text-gray-400">
                  No hay vinos similares disponibles
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WineInfo;
