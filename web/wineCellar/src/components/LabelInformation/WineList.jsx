import React from 'react';

const WineList = ({ wines, selectedTab }) => {
  if (selectedTab !== 'bottles') return null;

  return (
    <div className="bg-white shadow-lg rounded-xl max-h-[50vh] lg:max-h-[65vh] overflow-y-auto overscroll-contain mt-5">
      <div className="divide-y divide-neutral-300">
        {wines.map((wine) => (
          <div key={wine.id} className="relative">
            <a
              href={`/wine/${wine.id}`}
              className="flex p-4 gap-4 text-sm w-full hover:bg-gray-100 transition-all"
            >
              <div className="w-full flex items-center justify-start space-x-4">
                <div className="w-30 h-30 rounded-lg transition relative flex justify-center overflow-hidden">
                  <img
                    className="w-full h-full object-contain hover:scale-110 transition-transform"
                    src={wine.image}
                    alt="Wine Image"
                  />
                </div>

                <div className="flex flex-col w-3/4 space-y-2">
                  <div className="font-semibold text-xl">{wine.name}</div>

                  <div className="w-fit px-2 text-sm font-medium rounded-md bg-gray-400 text-white">
                    <span>{wine.winetype}</span>
                  </div>

                  <div className="text-sm text-gray-700 break-words">
                    {wine.description}
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineList;
