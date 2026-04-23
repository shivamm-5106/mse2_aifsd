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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Engine
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Find Lost Items
          </h1>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Search through reported lost and found items in your community
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="glass-card-static p-2 flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-3.5 pl-12 pr-4 bg-transparent text-white text-base placeholder-slate-500 outline-none font-medium"
                placeholder="Search by item name..."
                id="search-input"
              />
            </div>
            <button
              type="submit"
              className="btn-gradient !py-3 !px-7 shrink-0"
              disabled={loading}
              id="search-submit"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block"></span>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        {/* Results */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm">Searching items...</p>
          </div>
        ) : searched && results.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="empty-state-icon">
              <span>🔍</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
            <p className="text-slate-400 max-w-sm mx-auto">
              We couldn't find any items matching "<span className="text-blue-400 font-semibold">{query}</span>". Try a different keyword.
            </p>
          </div>
        ) : results.length > 0 ? (
          <div className="animate-fade-in-delay-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-400 text-sm">
                Found <strong className="text-white">{results.length}</strong> result{results.length !== 1 ? 's' : ''} for "<strong className="text-blue-400">{query}</strong>"
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {results.map((item, index) => (
                <div key={item._id} className={`animate-fade-in-delay-${Math.min(index + 1, 4)}`}>
                  <ItemCard item={item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in-delay-1">
            <div className="empty-state-icon">
              <span>🔎</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Start Searching</h3>
            <p className="text-slate-400 max-w-sm mx-auto">
              Type an item name in the search bar above to find matching lost or found items
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
