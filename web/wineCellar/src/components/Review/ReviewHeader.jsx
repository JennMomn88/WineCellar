import React from 'react';

const ReviewHeader = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="flex items-center justify-center ml-20 mt-15 p-5">
      <div className="sticky top-[45px] z-[1] w-200 border-b-neutral-200 bg-white flex items-center justify-center">
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="flex relative"
        >
          {/* "Community" */}
          <button
            role="tab"
            aria-selected={selectedTab === 'community'}
            className={`text-lg py-4 text-center px-6 font-bold text-black ${
              selectedTab === 'community' ? 'border-b-2 border-black' : ''
            }`}
            onClick={() => setSelectedTab('community')}
          >
            Community
          </button>

          {/* "My Reviews" */}
          <button
            role="tab"
            aria-selected={selectedTab === 'my-reviews'}
            className={`text-lg py-4 text-center px-6 font-bold text-black ${
              selectedTab === 'my-reviews' ? 'border-b-2 border-black' : ''
            }`}
            onClick={() => setSelectedTab('my-reviews')}
          >
            My Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewHeader;
