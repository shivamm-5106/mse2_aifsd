import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ItemCard = ({ item, onDelete }) => {
  const { user } = useAuth();
  const isOwner = user && item.userId && (item.userId._id === user._id || item.userId === user._id);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="glass-card p-5 animate-fade-in group" id={`item-card-${item._id}`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
          {item.itemName}
        </h3>
        <span className={item.type === 'Lost' ? 'badge-lost' : 'badge-found'}>
          {item.type}
        </span>
      </div>

      {item.description && (
        <p className="text-slate-400 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
      )}

      <div className="space-y-2 mb-4">
        {item.location && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{item.location}</span>
          </div>
        )}
        {item.date && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(item.date)}</span>
          </div>
        )}
        {item.contactInfo && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{item.contactInfo}</span>
          </div>
        )}
      </div>

      {item.userId && item.userId.name && (
        <p className="text-xs text-slate-500 mb-3">
          Posted by <span className="text-slate-400">{item.userId.name}</span>
        </p>
      )}

      <div className="flex items-center gap-2 pt-3 border-t border-slate-700/50">
        <Link
          to={`/items/${item._id}`}
          className="flex-1 text-center py-2 rounded-lg text-sm font-medium text-blue-400 hover:bg-blue-500/10 transition-all no-underline"
          id={`view-item-${item._id}`}
        >
          View Details
        </Link>
        {isOwner && (
          <>
            <Link
              to={`/items/${item._id}/edit`}
              className="py-2 px-3 rounded-lg text-sm font-medium text-amber-400 hover:bg-amber-500/10 transition-all no-underline"
              id={`edit-item-${item._id}`}
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete && onDelete(item._id)}
              className="py-2 px-3 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer bg-transparent border-none"
              id={`delete-item-${item._id}`}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
