import React from 'react';

const ReviewHeaderText = () => {
  return (
    <div className="flex flex-col gap-5 p-4 md:p-0">
      <h1 className="text-3xl md:text-4xl md:leading-tight text-center font-medium">
        Explore reviews from wine lovers worldwide.
      </h1>
      <h5 className="text-xs md:text-sm text-center text-neutral-500">
        Read informed reviews from thousands of wine lovers from around the
        world.
      </h5>
    </div>
  );
};

export default ReviewHeaderText;
