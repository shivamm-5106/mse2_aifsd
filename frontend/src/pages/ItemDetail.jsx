import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await API.get(`/items/${id}`);
        setItem(res.data);
      } catch (err) {
        setError('Item not found');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await API.delete(`/items/${id}`);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete item');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-white mb-2">Item Not Found</h2>
        <p className="text-slate-400 mb-6">The item you're looking for doesn't exist or has been removed.</p>
        <Link to="/dashboard" className="btn-gradient no-underline inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const isOwner = user && item.userId && (item.userId._id === user._id || item.userId === user._id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="animate-fade-in">
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 no-underline transition-colors"
          id="back-to-dashboard"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Detail Card */}
        <div className="glass-card p-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">{item.itemName}</h1>
            <span className={`${item.type === 'Lost' ? 'badge-lost' : 'badge-found'} text-base px-4 py-1.5`}>
              {item.type}
            </span>
          </div>

          {item.description && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
              <p className="text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {item.location && (
              <div className="glass-card p-4" style={{ transform: 'none' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="text-white font-medium">{item.location}</p>
                  </div>
                </div>
              </div>
            )}

            {item.date && (
              <div className="glass-card p-4" style={{ transform: 'none' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Date</p>
                    <p className="text-white font-medium">{formatDate(item.date)}</p>
                  </div>
                </div>
              </div>
            )}

            {item.contactInfo && (
              <div className="glass-card p-4" style={{ transform: 'none' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Contact</p>
                    <p className="text-white font-medium">{item.contactInfo}</p>
                  </div>
                </div>
              </div>
            )}

            {item.userId && item.userId.name && (
              <div className="glass-card p-4" style={{ transform: 'none' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Posted by</p>
                    <p className="text-white font-medium">{item.userId.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Owner Actions */}
          {isOwner && (
            <div className="flex gap-3 pt-6 border-t border-slate-700/50">
              <Link
                to={`/items/${item._id}/edit`}
                className="btn-gradient flex-1 text-center no-underline"
                id="detail-edit"
              >
                Edit Item
              </Link>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-xl font-semibold text-sm text-rose-400 border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all cursor-pointer"
                id="detail-delete"
              >
                Delete Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
