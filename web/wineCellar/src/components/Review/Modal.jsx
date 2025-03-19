import React, { useState } from 'react';

const Modal = ({ isOpen, closeModal, parentComment, handleAddComment }) => {
  const [message, setMessage] = useState('');

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="absolute inset-0 bg-opacity-10 backdrop-blur-sm z-40"></div>
        <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl flex z-50">
          <div className="w-1/2 max-w-[400px] h-[400px] mr-6">
            <img
              src={parentComment.wine.image}
              alt="Wine Bottle"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          <div className="w-full h-[400px] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Comentarios</h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              key={parentComment.id}
              className="border-b border-neutral-200 pb-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-300">
                  <img
                    src={parentComment.user.avatar}
                    alt={parentComment.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{parentComment.user.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(parentComment.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-gray-800">{parentComment.text}</p>
            </div>
            <div className="flex flex-col gap-6 items-center justify-center p-4">
              <textarea
                className="w-full h-32 mt-4 p-2 border rounded-lg bg-transparent dark:text-white"
                placeholder="How was the 2025 wine?"
                maxLength={2000}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              ></textarea>
              {console.log(message)}
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded-full opacity-50"
                onClick={() => handleAddComment(message)}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
