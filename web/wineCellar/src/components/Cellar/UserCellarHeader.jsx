import React from 'react';
import ButtonAddNew from './ButtonAddNew';

const UserCellarHeader = ({ userName }) => {
  return (
    <div className="flex justify-evenly items-center bg-white border-b border-neutral-200 p-3 gap-2 min-h-[72px]">
      {/* Nombre de la bodega */}
      <div className="flex gap-2 items-center text-2xl font-semibold whitespace-nowrap min-w-0">
        <div
          role="menubar"
          data-orientation="horizontal"
          aria-orientation="horizontal"
          className="menubar__root w-full"
        >
          <button
            type="button"
            role="menuitem"
            className="menubar__trigger transition-color duration-200 hover:bg-secondary p-4 pr-2 rounded-lg w-full"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="flex items-center space-x-2">
              <div>
                {/* Icono de la bodega */}
                <svg
                  viewBox="0 0 37 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="37"
                >
                  <path
                    d="M18 0L33.5885 9V27L18 36L2.41154 27V9L18 0Z"
                    fill="#35470fff"
                  ></path>
                </svg>
              </div>
              <div className="text-sm md:text-xl min-w-0 text-ellipsis overflow-hidden">
                {userName || 'Cellar'} {/*  usuario de la bodega */}
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="ml-auto">
        <ButtonAddNew />
      </div>
    </div>
  );
};

export default UserCellarHeader;
