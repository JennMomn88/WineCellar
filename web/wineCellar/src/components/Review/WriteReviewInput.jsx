import React from 'react';

const WriteReviewInput = () => {
  return (
    <div className="">
      <button className="w-full bg-white shadow md:rounded-xl py-2 px-2 flex gap-2 items-center">
        {/* Icono de perfil */}
        <div className="aspect-round overflow-hidden rounded-full w-12 bg-gray-300 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-full h-full text-white"
          >
            <g>
              <path
                fill="currentColor"
                d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12,12-5.4,12-12S18.6,0,12,0Zm0,18c-3.3,0-6-2.7-6-6s2.7-6,6-6,6,2.7,6,6-2.7,6-6,6Z"
              />
            </g>
          </svg>
        </div>

        {/* Campo de entrada */}
        <div className="p-4 flex flex-wrap gap-5">
          {/* Búsqueda */}
          <input
            type="text"
            placeholder="Search Review"
            className="w-60 p-2 bg-gray-50 border border-gray-300 rounded-full"
            onChange=""
          />
        </div>
        {/* Botón de Review */}
        <button
          role="tab"
          aria-selected="true"
          className="transition-background duration-200 items-center justify-center text-center h-10 px-4 py-2 paragraph-2 inline-flex rounded-full text-sm sm:text-base cursor-pointer border border-transparent bg-black text-white hover:bg-neutral-600"
        >
          Review
        </button>
      </button>
    </div>
  );
};

export default WriteReviewInput;
