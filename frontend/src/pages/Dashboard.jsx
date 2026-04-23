import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import ItemCard from '../components/ItemCard';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, my, lost, found
  const { user } = useAuth();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await API.get('/items');
      setItems(res.data);
    } catch (err) {
      console.error('Failed to fetch items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await API.delete(`/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete item');
    }
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'my') return item.userId?._id === user?._id || item.userId === user?._id;
    if (filter === 'lost') return item.type === 'Lost';
    if (filter === 'found') return item.type === 'Found';
    return true;
  });

  const stats = {
    total: items.length,
    lost: items.filter((i) => i.type === 'Lost').length,
    found: items.filter((i) => i.type === 'Found').length,
    mine: items.filter((i) => i.userId?._id === user?._id || i.userId === user?._id).length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-slate-400">Manage and browse all lost & found items</p>
        </div>
        <Link
          to="/items/new"
          className="btn-gradient mt-4 sm:mt-0 no-underline flex items-center gap-2"
          id="dashboard-add-item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Report Item
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4 text-center animate-fade-in-delay-1">
          <p className="text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-slate-400">Total Items</p>
        </div>
        <div className="glass-card p-4 text-center animate-fade-in-delay-1">
          <p className="text-2xl font-bold text-rose-400">{stats.lost}</p>
          <p className="text-sm text-slate-400">Lost</p>
        </div>
        <div className="glass-card p-4 text-center animate-fade-in-delay-2">
          <p className="text-2xl font-bold text-emerald-400">{stats.found}</p>
          <p className="text-sm text-slate-400">Found</p>
        </div>
        <div className="glass-card p-4 text-center animate-fade-in-delay-2">
          <p className="text-2xl font-bold text-blue-400">{stats.mine}</p>
          <p className="text-sm text-slate-400">My Posts</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap animate-fade-in-delay-2">
        {[
          { key: 'all', label: 'All Items' },
          { key: 'my', label: 'My Posts' },
          { key: 'lost', label: '🔴 Lost' },
          { key: 'found', label: '🟢 Found' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
              filter === tab.key
                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                : 'bg-transparent border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-300'
            }`}
            id={`filter-${tab.key}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="glass-card p-12 text-center animate-fade-in">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-white mb-2">No items found</h3>
          <p className="text-slate-400 mb-4">
            {filter === 'my'
              ? "You haven't posted any items yet."
              : 'No items match this filter.'}
          </p>
          <Link to="/items/new" className="btn-gradient no-underline inline-block">
            Report an Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
