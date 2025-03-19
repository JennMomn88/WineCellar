// TabComponent.js
import React, { useState, useEffect } from 'react';
import * as API from '../../services/ApiService';
import TabButtons from './TabButtons';
import TabContent from './TabContent';
import WineList from './WineList';

const TabComponent = () => {
  const [selectedTab, setSelectedTab] = useState('labels');
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { key: 'labels', label: 'Labels' },
    { key: 'bottles', label: 'Bottles' },
  ];

  useEffect(() => {
    API.getCellar()
      .then(({ wines }) => {
        const shuffledWines = wines.sort(() => Math.random() - 0.5);
        setWines(shuffledWines);
      })
      .catch((err) => {
        console.error('Error fetching wines:', err);
        setError('Error al cargar los vinos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleTabClick = (tabKey) => {
    setSelectedTab(tabKey);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <TabButtons
        tabs={tabs}
        selectedTab={selectedTab}
        onTabClick={handleTabClick}
      />

      <div>
        {selectedTab === 'labels' && (
          <TabContent selectedTab={selectedTab} wines={wines} />
        )}
        {selectedTab === 'bottles' && (
          <WineList wines={wines} selectedTab={selectedTab} />
        )}
      </div>
    </div>
  );
};

export default TabComponent;
