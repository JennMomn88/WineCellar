import React from 'react';

import CellarCard from './CellarCard';

const CellarComponent = () => {
  const cellars = [
    {
      name: 'My Cellar',
      bottlesCount: 0,
      value: '0.00 EUR',
      link: '/storage/223085',
    },
  ];

  return (
    <div className="my-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <div className="flex justify-between items-left mb-4 w-1/2"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cellars.map((cellar, index) => (
          <div key={index + cellar.name} className="col-span-1">
            <CellarCard
              cellarName={cellar.name}
              bottlesCount={cellar.bottlesCount}
              value={cellar.value}
              link={cellar.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CellarComponent;
