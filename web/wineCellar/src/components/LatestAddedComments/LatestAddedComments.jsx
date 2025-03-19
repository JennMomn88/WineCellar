import { useEffect, useState } from 'react';
import * as API from '../../services/ApiService';

const LatestAddedComments = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getLatestComments()
      .then((x) => {
        console.log(x);
        setComments(x);
      })
      .catch((err) => {
        console.error('Error fetching analytics:', err);
        setError('Error al cargar los datos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex w-full max-w-screen-sm mx-auto">
      <div className="space-y-3 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-neutral-500 font-medium py-4">
            Recent Community Reviews
          </h2>
          <a
            href="/review"
            className="flex py-4 h-full text-sm items-center text-info hover:text-neutral-400 transition duration-300 font-medium gap-2"
          >
            See all
            <svg
              viewBox="0 0 24 24"
              width="1.2em"
              height="1.2em"
              className="w-5"
            >
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

        {/* Grid Section */}
        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="text-sm text-gray-400">Cargando datos...</div>
          ) : error ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : (
            comments.map((comment, index) => {
              const { wine, user } = comment;
              console.log(comment);

              return (
                <div
                  key={comment.id}
                  className={`w-full p-3 rounded-lg  transition-all ${
                    index !== 0 && 'hover:bg-gray-100'
                  }`}
                >
                  {index === 0 ? (
                    <div className="p-3 rounded-lg bg-white shadow-lg">
                      {/*  Información del vino */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg shadow-md">
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
                      </div>

                      <div className="mt-1 flex items-center gap-3 p-1 rounded-lg ">
                        <div className="w-10 h-10 rounded-full overflow-hidden shadow">
                          <img
                            className="w-full h-full object-cover"
                            src={user.avatar || '/default-avatar.png'}
                            alt="User Avatar"
                          />
                        </div>
                        <p className="font-medium">{user.name}</p>
                      </div>

                      {comment.image && (
                        <div className="mt-3">
                          <img
                            className="max-w-full rounded-lg shadow"
                            src={comment.image}
                            alt="Uploaded by user"
                          />
                        </div>
                      )}

                      <div className="mt-3 p-2 rounded-lg">
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg shadow-md">
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
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden shadow">
                        <img
                          className="w-full h-full object-cover"
                          src={user.avatar || '/default-avatar.png'}
                          alt="User Avatar"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestAddedComments;
