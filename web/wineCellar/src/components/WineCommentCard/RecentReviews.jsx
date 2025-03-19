import React from 'react';

const RecentReviews = () => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="text-muted py-4">Recent Community Reviews</h2>
      <a
        href="/reviews"
        className="d-flex align-items-center text-info text-decoration-none py-4 fs-6 gap-2 hover:text-secondary"
      >
        See all
        <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" className="w-5">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default RecentReviews;
