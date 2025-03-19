import React, { useState } from 'react';
import AddWineList from '../AddWineList/AddWineList';
import * as API from '../../services/ApiService';

const ButtonAddNew = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWine, setSelectedWine] = useState(null);
  const [cellarWines, setCellarWines] = useState([]);

  //
  const openModal = () => {
    setIsModalOpen(true);
  };

  //
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWine(null);
  };

  const addToCellar = (wine) => {
    if (!wine) {
      alert('Please select a wine first!');
      return;
    }

    const alreadyInCellar = cellarWines.some(
      (cellarWine) => cellarWine.id === wine.id
    );

    if (alreadyInCellar) {
      alert('This wine is already in your cellar! 🍷');
      return;
    }

    API.addWineToCellar(wine.id)
      .then((response) => {
        if (response.success) {
          setCellarWines((prev) => [...prev, wine]);
          alert(`${wine.name} added to your cellar! ✅`);
          closeModal(); //
        } else {
          alert('Failed to add wine to cellar. Please try again later.');
        }
      })
      .catch(() => alert('Error adding wine to cellar.'));
  };

  return (
    <div>
      <button
        className="transition-background duration-200 justify-items-end text-center h-10 px-4 gap-2 py-2 paragraph-2 inline-flex rounded-full text-sm sm:text-base cursor-pointer border border-transparent bg-black text-white hover:bg-neutral-600"
        onClick={openModal}
      >
        Add new
        <svg
          viewBox="0 0 24 24"
          width="1.2em"
          height="1.2em"
          className="w-5 h-5"
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
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50">
          <div className="relative gap-4 bg-white p-6 rounded-lg shadow-xl w-[900px] h-[500px] flex">
            {/* Columna izquierda con la lista de vinos */}
            <div className="flex-1 p-4 overflow-y-auto">
              <h2 className="text-xl font-medium text-center mb-4">
                Add New Wine
              </h2>
              <AddWineList
                setSelectedWine={setSelectedWine}
                cellarWines={cellarWines}
              />
            </div>

            {selectedWine && (
              <div className="w-1/3 p-4 border-l-2 border-gray-300 flex flex-col">
                <h3 className="text-xl font-semibold">Wine Details:</h3>
                <h4 className="font-medium text-lg">{selectedWine.name}</h4>
                <p className="text-sm gap-5 text-black">
                  Origin: {selectedWine.city}, {selectedWine.country}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {selectedWine.description}
                </p>

                <div className="mt-auto flex justify-center">
                  <button
                    className="transition-background duration-200  h-10 px-4 py-2 paragraph-2 inline-flex rounded-full text-sm sm:text-base cursor-pointer border border-transparent bg-black text-white hover:bg-neutral-600"
                    onClick={() => addToCellar(selectedWine)} // Llamar a la función de agregar vino
                  >
                    Add to My Cellar
                  </button>
                </div>
              </div>
            )}

            <div className="absolute top-0 right-0 p-2">
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Dismiss"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="1.2em"
                  height="1.2em"
                  className="w-5 h-5"
                  stroke="currentColor"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonAddNew;
