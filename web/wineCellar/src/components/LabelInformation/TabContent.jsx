import React from 'react';

const TabContent = ({ selectedTab, wines }) => {
  if (selectedTab === 'labels') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-8 px-4">
        {wines
          .filter((wine) => wine.label !== 'false')
          .map((wine) => (
            <div key={wine.id} className="bg-white p-3 rounded-xl shadow-md">
              <div className="flex items-center gap-2">
                {wine.label && (
                  <div className="w-30 h-20">
                    <img
                      src={wine.label}
                      alt="Wine label"
                      className="object-contain w-full h-full rounded-xl"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-between">
                  <span className="font-semibold text-base">{wine.name}</span>
                  <span className="text-sm mt-1 text-gray-500">
                    {wine.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return null; // Si no es 'labels', no renderiza nada.
};

export default TabContent;
