const WineListCellar2 = ({ filteredWines, loading, error }) => {
  return (
    <div className="divide-y divide-gray-300">
      {loading && <p className="text-center text-gray-500">Loading wines...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {filteredWines.map((wine) => (
        <div key={wine.id} className="p-4 flex gap-4 items-center">
          <img
            src={wine.image}
            alt={wine.name}
            className="w-20 h-20 object-cover rounded-lg"
          />

          <p className="font-semibold">{wine.name}</p>
          <p className="text-gray-500">
            {wine.country} - {wine.type}
          </p>
          <p className="text-green-600">{wine.price} €</p>
        </div>
      ))}
    </div>
  );
};

export default WineListCellar2;
