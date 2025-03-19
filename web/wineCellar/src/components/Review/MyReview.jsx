import React from 'react';

const MyReview = ({ openModal }) => {
  return (
    <div className="flex flex-col gap-8 items-center max-w-2xl w-full mx-auto p-8">
      <div className="w-full bg-white rounded-xl py-4 px-6 flex flex-col gap-4 shadow-md">
        <div>
          <button
            className="w-full bg-white transition-all hover:shadow-lg rounded-xl py-3 px-4 flex gap-4 items-center"
            onClick={openModal}
          >
            <div className="w-full rounded-md p-3 bg-gray-50 text-neutral-400">
              Write a review...
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyReview;
