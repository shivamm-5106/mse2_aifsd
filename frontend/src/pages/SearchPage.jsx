import { useState } from 'react';
import API from '../services/api';
import ItemCard from '../components/ItemCard';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const res = await API.get(`/items/search?name=${encodeURIComponent(query)}`);
      setResults(res.data);
    } catch (err) {
      console.error('Search failed:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">Search Items</h1>
          <p className="text-slate-400 text-lg">Find lost or found items by name</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-glass w-full py-4 pl-14 pr-32 text-lg"
              placeholder="Search for items..."
              id="search-input"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button
              type="submit"
              className="btn-gradient absolute right-2 top-1/2 -translate-y-1/2 py-2.5 px-6"
              disabled={loading}
              id="search-submit"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : searched && results.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-slate-400">
              Try searching with different keywords
            </p>
          </div>
        ) : results.length > 0 ? (
          <>
            <p className="text-slate-400 mb-4 text-sm">
              Found <strong className="text-white">{results.length}</strong> result{results.length !== 1 ? 's' : ''} for "<strong className="text-blue-400">{query}</strong>"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 animate-fade-in-delay-1">
            <div className="text-6xl mb-4">🔎</div>
            <h3 className="text-xl font-semibold text-white mb-2">Start Searching</h3>
            <p className="text-slate-400">
              Enter an item name above to find lost or found items
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
