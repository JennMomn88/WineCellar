import { useState, useEffect, useRef } from 'react';

const WineFilters = ({ wines, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [wineType, setWineType] = useState('');
  const [country, setCountry] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const uniqueCountries = [...new Set(wines.map((wine) => wine.country))];
  const filteredCountries = uniqueCountries.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  useEffect(() => {
    onFilterChange({ searchQuery, wineType, country, sortOption });
  }, [searchQuery, wineType, country, sortOption, wines]);

  const clearFilters = () => {
    setSearchQuery('');
    setWineType('');
    setCountry('');
    setSortOption('');
    setCountrySearch('');
    setShowCountryDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 flex flex-wrap gap-5">
      <input
        type="text"
        placeholder="Search cellar"
        className="w-60 p-2 bg-gray-50 border border-gray-300 rounded-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select
        className="p-2 border rounded-full"
        value={wineType}
        onChange={(e) => setWineType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="Tinto">Tinto</option>
        <option value="Blanco">Blanco</option>
        <option value="Rosado">Rosado</option>
        <option value="Espumoso">Espumoso</option>
      </select>

      <div className="relative w-52" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Search country"
          className="w-full p-2 border rounded-full"
          value={countrySearch}
          onChange={(e) => setCountrySearch(e.target.value)}
          onFocus={() => setShowCountryDropdown(true)}
        />
        {showCountryDropdown && (
          <div className="absolute z-10 w-full bg-white border max-h-40 overflow-y-auto shadow-lg">
            {filteredCountries.length === 0 ? (
              <p className="p-2 text-gray-500">No results</p>
            ) : (
              filteredCountries.map((c) => (
                <div
                  key={c}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setCountry(c);
                    setCountrySearch(c);
                    setShowCountryDropdown(false);
                  }}
                >
                  {c}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <select
        className="p-2 border rounded-full"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="priceAsc">Price Ascending</option>
        <option value="priceDesc">Price Descending</option>
      </select>

      <button
        role="tab"
        aria-selected="true"
        className="transition-background duration-200 items-center justify-center text-center h-10 px-4 py-2 paragraph-2 inline-flex rounded-full text-sm sm:text-base cursor-pointer border border-transparent bg-black text-white hover:bg-neutral-600"
        onClick={clearFilters}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default WineFilters;
