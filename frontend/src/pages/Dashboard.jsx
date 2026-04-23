import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import ItemCard from '../components/ItemCard';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
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
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-400 text-sm">
            Manage and browse all lost & found items
          </p>
        </div>

        <Link
          to="/items/new"
          className="btn-gradient h-[44px] px-5 flex items-center justify-center gap-2"
          id="dashboard-add-item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Report Item
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-10">
        <div className="stat-card stat-total">
          <p className="text-3xl font-bold text-white">{stats.total}</p>
          <p className="text-sm text-slate-400 mt-1">Total Items</p>
        </div>

        <div className="stat-card stat-lost">
          <p className="text-3xl font-bold text-rose-400">{stats.lost}</p>
          <p className="text-sm text-slate-400 mt-1">Lost</p>
        </div>

        <div className="stat-card stat-found">
          <p className="text-3xl font-bold text-emerald-400">{stats.found}</p>
          <p className="text-sm text-slate-400 mt-1">Found</p>
        </div>

        <div className="stat-card stat-mine">
          <p className="text-3xl font-bold text-blue-400">{stats.mine}</p>
          <p className="text-sm text-slate-400 mt-1">My Posts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: 'All Items', icon: '📋' },
          { key: 'my', label: 'My Posts', icon: '👤' },
          { key: 'lost', label: 'Lost', icon: '🔴' },
          { key: 'found', label: 'Found', icon: '🟢' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`filter-btn h-[40px] px-4 flex items-center justify-center gap-1.5 ${
              filter === tab.key ? 'active' : ''
            }`}
            id={`filter-${tab.key}`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="divider-gradient mb-6"></div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-500 text-sm">Loading items...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20">
          <div className="empty-state-icon mb-4">
            <span>📦</span>
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">
            No items found
          </h3>

          <p className="text-slate-400 mb-6 max-w-sm mx-auto text-sm">
            {filter === 'my'
              ? "You haven't posted any items yet. Report your first lost or found item."
              : 'No items match this filter. Try a different category.'}
          </p>

          <Link
            to="/items/new"
            className="btn-gradient h-[44px] px-5 inline-flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Report an Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;