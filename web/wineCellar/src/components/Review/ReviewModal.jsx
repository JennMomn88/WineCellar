import React from 'react';

const ReviewModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg w-full max-w-xl p-4 max-h-[96vh] overflow-hidden">
        <div className="flex justify-between items-center border-b dark:border-neutral-800 border-neutral-200 pb-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-600"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
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
          <h2
            id="modal-title"
            className="text-lg font-semibold dark:text-white"
          >
            Review
          </h2>
          <button
            disabled
            className="bg-info text-white px-4 py-2 rounded-full opacity-50"
          >
            Post
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          </div>
          <textarea
            className="w-full h-32 mt-4 p-2 border rounded-lg bg-transparent dark:text-white"
            placeholder="How was the 2025 wine?"
            maxLength={2000}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
