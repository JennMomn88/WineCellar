import { useEffect, useState } from 'react';
import ButtonAddNew from '../components/Cellar/ButtonAddNew';
import WineCellar from '../components/Cellar/wineCellar';
import * as API from '../services/ApiService';

function CellarPage() {
  const [cellar, setCellar] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!loading) return;
    API.getCellar()
      .then((cellar) => {
        setCellar(cellar);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading cellar: ', error);
        setError('Error loading cellar!');
      });
  }, [loading]);

  const handleRemoveFromCellar = (wineId) => {
    API.removeWineFromCellar(wineId, 'Consumido').then((updatedCellar) => {
      console.log(updatedCellar);
      setLoading(true);
    });
  };

  return (
    <>
      <ButtonAddNew />
      <div className=" ml-50 mr-15 flex items-center justify-center h-screen">
        {cellar && (
          <WineCellar
            loading={loading}
            error={error}
            username={cellar?.owner.name}
            wines={cellar?.wines}
            handleRemoveFromCellar={handleRemoveFromCellar}
          />
        )}
      </div>
    </>
  );
}

export default CellarPage;
