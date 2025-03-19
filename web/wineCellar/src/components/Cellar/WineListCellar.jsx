import { useState, useEffect } from 'react';
import * as API from '../../services/ApiService';

const WineTypeDropdown = ({ selectedWineType, setSelectedWineType }) => {
  const wineTypes = [
    { label: 'Tinto', icon: '/_build/assets/red-wine.svg' },
    { label: 'Blanco', icon: '/_build/assets/white-wine.svg' },
    { label: 'Rosado', icon: '/_build/assets/rosé-wine.svg' },
    { label: 'Espumoso', icon: '/_build/assets/sparkling-wine.svg' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="h-10 px-4 py-2 border border-neutral-200 rounded-full text-sm bg-white cursor-pointer hover:bg-gray-200 flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedWineType || 'Select Wine Type'}
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 bg-white shadow-md rounded-xl text-base min-w-[200px] w-full p-4 z-50">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {wineTypes.map((wine) => (
              <button
                key={wine.label}
                className={`p-2 rounded-lg border-2 transition ${
                  selectedWineType === wine.label
                    ? 'border-primary-content'
                    : 'border-transparent hover:bg-gray-100'
                }`}
                onClick={() => {
                  setSelectedWineType(wine.label);
                  setIsOpen(false);
                }}
              >
                <img
                  className="h-[45px] w-[45px] mx-auto"
                  src={wine.icon}
                  alt={wine.label}
                />
                <span className="capitalize">{wine.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CountryDropdown = ({
  selectedCountry,
  setSelectedCountry,
  countries,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        className="h-10 px-4 py-2 border border-neutral-200 rounded-full text-sm bg-white cursor-pointer hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCountry || 'Select Country'} <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 bg-white shadow-md rounded-xl text-base w-full max-w-[250px] p-4 z-50">
          <input
            type="text"
            placeholder="Search country..."
            className="w-full p-2 border rounded-md mb-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="max-h-40 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country}
                className="block w-full text-left p-2 hover:bg-gray-100 rounded-md"
                onClick={() => {
                  setSelectedCountry(country);
                  setIsOpen(false);
                }}
              >
                {country}
              </button>
            ))}
          </div>
          <button
            className="w-full mt-2 text-red-500 underline"
            onClick={() => {
              setSelectedCountry('');
              setIsOpen(false);
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

const WineListCellar = () => {
  const [wines, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [wineType, setWineType] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    API.getCellar()
      .then(({ wines }) => {
        setWines(wines);
        setFilteredWines(wines);
      })
      .catch((err) => {
        console.error('Error fetching wines:', err);
        setError('Error al cargar los vinos');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let updatedWines = [...wines];

    if (searchQuery) {
      updatedWines = updatedWines.filter((wine) =>
        wine.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (wineType) {
      updatedWines = updatedWines.filter((wine) => wine.type === wineType);
    }

    if (country) {
      updatedWines = updatedWines.filter((wine) => wine.country === country);
    }

    if (sortOption === 'priceAsc') {
      updatedWines.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      updatedWines.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
      updatedWines.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredWines(updatedWines);
  }, [sortOption, searchQuery, wineType, country, wines]);

  const uniqueCountries = [...new Set(wines.map((wine) => wine.country))];

  return (
    <div className="bg-white shadow-lg rounded-xl w-full max-w-[90vw] min-h-[70vh] max-h-[90vh] mx-auto overflow-y-auto">
      <div className="p-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Search collection"
          className="w-full p-2 pl-9 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          <WineTypeDropdown
            selectedWineType={wineType}
            setSelectedWineType={setWineType}
          />
          <CountryDropdown
            selectedCountry={country}
            setSelectedCountry={setCountry}
            countries={uniqueCountries}
          />

          <button
            className="h-10 px-4 py-2 border border-neutral-200 rounded-full text-sm hover:bg-gray-200"
            onClick={() => setSortOption('name')}
          >
            Sort by Name
          </button>
          <button
            className="h-10 px-4 py-2 border border-neutral-200 rounded-full text-sm hover:bg-gray-200"
            onClick={() => setSortOption('priceAsc')}
          >
            Price Ascending
          </button>
          <button
            className="h-10 px-4 py-2 border border-neutral-200 rounded-full text-sm hover:bg-gray-200"
            onClick={() => setSortOption('priceDesc')}
          >
            Price Descending
          </button>
        </div>
      </div>

      <div className="divide-y divide-neutral-300">
        {loading && (
          <p className="text-center text-gray-500">Cargando vinos...</p>
        )}
        {error && <p className="text-center text-red-600">{error}</p>}
        {filteredWines.map((wine) => (
          <div key={wine.id} className="p-4">
            <p className="font-semibold">{wine.name}</p>
            <p className="text-gray-500">{wine.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineListCellar;
