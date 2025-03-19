import { useEffect, useState } from 'react';
import CollectionHeader from './CollectionHeader';
import * as API from '../../services/ApiService';

function AnalyticsPanel() {
  const [data, setData] = useState({
    collectionName: 'unknow',
    marketValue: 0,
    purchaseValue: 0,
    consumed: 0,
    labels: 0,
    slotsOccupied: '0/0',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);

  const getWineMarketValue = (originalPrice, year) =>
    originalPrice * Math.pow(1 + 0.05, new Date().getFullYear() - year);

  // Basic Euro formatting
  const formatToEuro = (number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(number);
  };

  const toggleBlur = () => {
    setIsBlurred((prev) => !prev); // se pone borroso el boton
  };

  useEffect(() => {
    API.getCellar()
      .then(({ wines, name }) => {
        setData({
          collectionName: name,
          marketValue: wines.reduce(
            (accMarketValue, wine) =>
              accMarketValue + getWineMarketValue(wine.price, wine.year),
            0
          ),
          purchaseValue: wines.reduce(
            (accPurchaseValue, wine) => accPurchaseValue + wine.price,
            0
          ),
          consumed: 0,
          labels: wines.length,
          slotsOccupied: `${wines.length}/20`,
        });
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
    <div className="p-4 bg-white rounded-lg shadow-md space-y-5 divide-y divide-neutral-200">
      <CollectionHeader
        isBlurred={isBlurred}
        toggleBlur={toggleBlur}
        name={data.collectionName}
        loading={loading}
        error={error}
      />
      {loading ? (
        <div className="text-sm text-gray-400">Loading...</div>
      ) : error ? (
        <div className="text-sm text-red-500">{error}</div>
      ) : (
        <>
          <div className="flex flex-row flex-wrap gap-3">
            {/* Market Value */}
            <div className="flex flex-1 flex-col space-y-1">
              <h3 className="flex items-center text-sm font-medium text-neutral-500">
                Market Value
              </h3>
              <div
                className={`flex gap-2 items-center font-bold text-xl ${
                  isBlurred ? 'filter blur-sm select-none' : ''
                }`}
              >
                {formatToEuro(data.marketValue)}
              </div>
            </div>

            {/* precio de compra */}
            <div className="flex flex-1 flex-col space-y-1">
              <h3 className="flex items-center text-sm font-medium text-neutral-500">
                Purchase Value
              </h3>
              <div
                className={`flex gap-2 items-center font-bold text-xl ${
                  isBlurred ? 'filter blur-sm select-none' : ''
                }`}
              >
                {formatToEuro(data.purchaseValue)}
              </div>
            </div>
          </div>

          <div className="flex justify-evenly pt-5 gap-3 flex-row flex-wrap">
            {/* Consumed */}
            <div className="flex flex-1 flex-col space-y-1">
              <h3 className="text-sm font-medium text-neutral-500">Consumed</h3>
              <div className="font-bold text-xl">{data.consumed}</div>
            </div>

            {/* Labels */}
            <div className="flex flex-1 flex-col space-y-1">
              <h3 className="text-sm font-medium text-neutral-500">Labels</h3>
              <div className="font-bold text-xl">{data.labels}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AnalyticsPanel;
