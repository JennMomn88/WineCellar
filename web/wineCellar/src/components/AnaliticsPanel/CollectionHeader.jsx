function CollectionHeader({ isBlurred, toggleBlur, name, loading, error }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mt-4">
      <div>
        {loading ? (
          <div className="text-sm text-gray-400">Cargando...</div>
        ) : error ? (
          <div className="text-sm text-red-500">{error}</div>
        ) : (
          <a
            href="/analytics"
            className="text-xl font-semibold text-gray-900 hover:text-gray-500"
          >
            {name}'s Collection
          </a>
        )}
      </div>

      <button
        type="button"
        className={`transition-all duration-200 flex items-center justify-center rounded-full focus:outline-none p-2 ${
          isBlurred ? 'bg-red-400' : 'bg-red-200'
        }`}
        aria-pressed="true"
        aria-label="Toggle blur"
        onClick={toggleBlur}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M3.98 8.223A10.5 10.5 0 0 0 1.934 12c1.292 4.339 5.31 7.5 10.066 7.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.499a10.52 10.52 0 0 1-4.293 5.773M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      </button>
    </div>
  );
}

export default CollectionHeader;
