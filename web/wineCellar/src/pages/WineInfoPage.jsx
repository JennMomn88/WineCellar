import React, { useState, useEffect } from 'react';
import WineInfo from '../components/ProductInfo/WineInfo';
import * as API from '../services/ApiService';
import { useParams } from 'react-router';

const WineInfoPage = () => {
  const [cellar, setCellar] = useState(null);
  const [wineInCellar, setWineInCellar] = useState(false);
  const [similarWines, setSimilarWines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wine, setWine] = useState(null);

  const { wineId } = useParams();

  useEffect(() => {
    API.getWineById(wineId)
      .then((wineData) => {
        setWine(wineData);

        API.getCellar()
          .then((data) => {
            setCellar(data);
            const isWineInCellar = data?.wines?.some(
              (w) => w.id === wineData.id
            );
            setWineInCellar(isWineInCellar);
          })
          .catch(console.error);

        API.searchWinesByType(wineData.winetype)
          .then((similarData) => {
            console.log(similarData);
            setSimilarWines(similarData);
          })
          .catch(console.error);
      })
      .catch(console.error)
      .finally(setIsLoading(false));
  }, [wineId]);

  const handleAddToCellar = () => {
    if (!wineInCellar) {
      API.addWineToCellar(wine.id)
        .then(() => setWineInCellar(true))
        .catch(console.error);
    }
  };

  return (
    <div className="ml-50 mr-15 flex items-center justify-center h-screen ">
      {!isLoading && wine && (
        <WineInfo
          wine={wine}
          wineInCellar={wineInCellar}
          onAddToCellar={handleAddToCellar}
          similarWines={similarWines}
        />
      )}
    </div>
  );
};

export default WineInfoPage;
