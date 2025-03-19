import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../services/ApiService';
import Modal from './Modal';
import { useAuthContext } from '../../contexts/AuxContext';

const CommentList = ({ selectedTab }) => {
  const [comments, setComments] = useState([]);
  const [wineName, setWineName] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const { user } = useAuthContext();
  useEffect(() => {
    if (selectedTab === 'community') {
      API.getComments()
        .then((resp) => {
          setComments(resp);
        })
        .catch((err) => {
          console.error('Error fetching latest comments:', err);
          setError('Error al cargar los datos');
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (selectedTab === 'my-reviews') {
      API.getUserComments(user.id)
        .then((resp) => {
          setComments(resp);
        })
        .catch((err) => {
          console.error('Error fetching latest comments:', err);
          setError('Error al cargar los datos');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedTab, loading]);

  if (loading) {
    return <div className="text-sm text-gray-400">Cargando datos...</div>;
  }
  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  const openModal = (wine) => {
    setSelectedComment(wine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComment(null);
  };

  const handleAddComment = (message) => {
    API.postComment({
      message: message,
      wineId: selectedComment.wine.id,
    })
      .then((resp) => {
        console.log(resp);
        closeModal();
        setLoading(true);
      })
      .catch((err) => {
        console.error('Error posting comment:', err);
        setError('Error posting comment');
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-items-center w-full bg-white shadow md:rounded-xl py-2 px-2 gap-2">
        <div className="p-4 flex flex-wrap gap-5">
          <input
            type="text"
            placeholder="Search Review"
            className="w-60 p-2 bg-gray-50 border border-gray-300 rounded-full"
            onChange={(e) => setWineName(e.target.value)}
            value={wineName}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-3xl mx-auto">
        {comments
          .filter((comment) =>
            comment.wine.name.toLowerCase().includes(wineName.toLowerCase())
          )
          .map((comment) => {
            const { wine, user } = comment;
            return (
              <div
                key={comment.id}
                className="w-full p-5 rounded-lg bg-white shadow-lg transition-all hover:bg-gray-100"
              >
                <Link
                  to={`/wine/${wine.id}`}
                  className="p-3 rounded-lg flex items-center gap-3 transition-all mt-3 border-b border-gray-300 border-opacity-50 hover:shadow-xl" // Añadir hover para sombrear
                >
                  <div className="w-16 h-16 rounded-lg shadow-md">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={wine.image}
                      alt="Wine Thumbnail"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {wine.name} - {wine.year}
                    </h3>
                    <p className="text-neutral-500">
                      {wine.winery}, {wine.country}
                    </p>
                  </div>
                </Link>

                <div className="mt-1 flex items-center gap-3 p-1 rounded-lg">
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow">
                    <img
                      className="w-full h-full object-cover"
                      src={user.avatar || '/default-avatar.png'}
                      alt="User Avatar"
                    />
                  </div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.updatedAt).toLocaleString()}
                  </p>
                </div>
                {comment.image && (
                  <div className="mt-3">
                    <img
                      className="w-full rounded-lg shadow"
                      src={comment.image}
                      alt="Uploaded by user"
                    />
                  </div>
                )}
                <div className="mt-3 p-2 rounded-lg border-b border-gray-300 border-opacity-50">
                  <p>{comment.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() => openModal(comment)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-neutral border border-transparent bg-white text-sm font-medium transition-all duration-200 hover:shadow-md hover:shadow-gray-300 hover:bg-gray-100 ml-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width=""
                    height=""
                    className="w-10 h-10 text-gray-600"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16.5 10a4.5 4.5 0 0 0-4.5-4.5h-1a4.5 4.5 0 0 0-4.5 4.5c0 1.157.431 2.211 1.126 3.012C8.635 14.38 9 15 9 15h7s.365-.62 1.374-1.988C16.069 12.211 16.5 11.157 16.5 10z"
                    />
                  </svg>
                  <span>Comment</span>
                </button>
              </div>
            );
          })}

        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          parentComment={selectedComment}
          handleAddComment={handleAddComment}
        />
      </div>
    </>
  );
};

export default CommentList;
