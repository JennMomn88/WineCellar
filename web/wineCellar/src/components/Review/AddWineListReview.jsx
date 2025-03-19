import React, { useState, useEffect } from 'react';
import * as API from '../../services/ApiService';

const AddWineListReview = () => {
  const [wine, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedWine, setSelectedWine] = useState(null);
  const [comment, setComment] = useState('');
  const [userComment, setUserComment] = useState(null);

  useEffect(() => {
    if (searchTerm.length < 3) {
      setFilteredWines([]);
      setSelectedWine(null);
      setUserComment(null);
      setComment('');
      return;
    }

    if (searchTerm.trim()) {
      setLoading(true);
      API.getWines()
        .then((data) => {
          setWines(data);
          setFilteredWines(
            data.filter((wine) =>
              wine.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        })
        .catch(() => setError('Error loading wines'))
        .finally(() => setLoading(false));
    }
  }, [searchTerm]);

  const selectWine = (wine) => {
    setSelectedWine(wine);
    setComment('');
    API.getUserComment(wine.id)
      .then((response) => {
        if (response.success) {
          setUserComment(response.data.comment);
        } else {
          setUserComment(null);
        }
      })
      .catch(() => alert('Error fetching user comment.'));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const postComment = () => {
    if (!comment) {
      alert('Please write a comment before posting!');
      return;
    }

    if (userComment) {
      alert('You have already commented on this wine!');
      return;
    } else {
      API.postComment({ wineId: selectedWine.id, message: comment }, comment)
        .then((response) => {
          console.log(response);
          if (response) {
            alert('Your comment has been posted!');
          } else {
            alert('Failed to post the comment.');
          }
        })
        .catch(() => alert('Error posting comment.'));
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-xl  mt-6 w-full">
      {error && (
        <div className="w-full text-center text-red-600 font-medium p-4 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <div className="w-full">
        <input
          type="text"
          className="w-full max-w-md p-3 bg-gray-50 border border-gray-300 rounded-xl mx-auto block shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Search wines"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <div className="text-center text-gray-500 mt-4">Loading wines...</div>
        ) : // Solo mostrar vinos si hay un término de búsqueda y si hay resultados
        searchTerm.length > 0 && filteredWines.length > 0 ? (
          <ul className="list-none p-0 mt-5 overflow-x-hidden max-h-[400px]">
            {filteredWines.map((wine) => (
              <li
                key={wine.id}
                onClick={() => selectWine(wine)}
                className="flex flex-row items-center h-20 w-full rounded-lg my-2 px-4 space-x-4 cursor-pointer hover:bg-gray-200 transition-all ease-in-out"
              >
                {/* Imagen */}
                <div className="w-16 h-16 rounded-lg flex self-center bg-black overflow-hidden mr-4 shadow-md">
                  <img
                    className="w-full h-full object-cover"
                    src={wine.image}
                    alt="Wine Image"
                  />
                </div>

                {/* Nombre del vino */}
                <div className="font-medium text-left text-lg w-full truncate">
                  {wine.name}
                </div>

                {/* Descripción corta del vino */}
                {wine.region && wine.country && (
                  <div className="text-gray-500 text-xs w-fit">
                    {wine.region}, {wine.country}
                  </div>
                )}

                {/* Tipo de vino */}
                <div className="flex flex-row space-x-2">
                  <span>
                    <span className="px-2 text-sm font-semibold rounded-md bg-red-400 text-white">
                      {wine.winetype}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          searchTerm.length > 0 && (
            <li className="text-center text-gray-500 p-4">No wines found</li>
          )
        )}
      </div>

      <div className="w-full p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-md mt-6">
        {selectedWine ? (
          <>
            <h3 className="text-2xl font-semibold text-gray-800">
              {selectedWine.name}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Origin: {selectedWine.city}, {selectedWine.country}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {selectedWine.description}
            </p>
          </>
        ) : (
          <p className="text-gray-500 text-sm">Select a wine to comment on.</p>
        )}

        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Write your review here..."
          className="mt-4 p-3 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          disabled={userComment}
        ></textarea>

        {userComment && (
          <div className="mt-4 p-4 bg-gray-100 border rounded-md">
            <p className="font-semibold text-gray-700">
              Your previous comment:
            </p>
            <p className="text-gray-600 mt-2">{userComment}</p>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            className={`transition-all duration-200 h-12 px-6 py-3 rounded-full text-base font-semibold cursor-pointer border border-transparent ${
              userComment
                ? 'bg-gray-400 text-white'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            onClick={postComment}
            disabled={userComment && !comment} // Deshabilitar si ya hay comentario y no se escribe uno nuevo
          >
            {userComment ? 'You have already commented' : 'Post Comment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWineListReview;
