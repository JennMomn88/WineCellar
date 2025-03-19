import { useEffect, useState } from 'react';
import * as WineCellarApi from '../../services/ApiService';

function Welcome() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Loading user data...');
    WineCellarApi.profile()
      .then((user) => {
        if (user && user.name) {
          setUserName(user.name);
        } else {
          throw new Error("Unable to fetch the user's name.");
        }
      })
      .catch((error) => {
        setError(error.message || 'Error loading user data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      {loading ? (
        <>
          <p className="mt-5 text-6xl font-semibold text-neutral-500">
            Welcome to WineCellar...
          </p>
          <h1 className="text-4xl font-semibold">
            Start building your collection
          </h1>
          <p className="mt-4 text-sm">Loading...</p>
        </>
      ) : error ? (
        <>
          <p className="mt-5 text-4xl font-semibold text-red-500">
            Welcome to WineCellar
          </p>
          <h1 className="text-3xl font-semibold">
            Start building your collection
          </h1>
          <p className="text-red-600 mt-4">{error}</p>
        </>
      ) : (
        <>
          <p className="text-4xl text-emerald-900 font-semibold">
            Welcome to WineCellar, {userName}!
          </p>
          <h1 className="text-xl font-semibold">
            Start building your collection
          </h1>
        </>
      )}
    </div>
  );
}

export default Welcome;
