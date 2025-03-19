import { useEffect, useState } from 'react';
import * as API from '../services/ApiService';
import WinePageComponent from '../components/WinePage/WinepageComponent';

const WinePage = () => {
  const [wines, setWines] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getWines()
      .then((data) => {
        const sortedWines = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setWines(sortedWines);
      })
      .catch((error) => {
        console.error('Error fetching wines:', error);
        setError('Error al cargar los datos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="mt-30 text-4xl font-semibold text-gray-800 text-center tracking-wide ">
        WineCellar <span className="text-red-900">Database</span>
      </h1>
      <div className=" ml-50 mr-15 flex items-center justify-center h-screen">
        <WinePageComponent loading={loading} error={error} wines={wines} />
      </div>
    </>
  );
};

export default WinePage;
