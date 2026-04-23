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
    <div className="glass-card p-5 flex flex-col h-full group" id={`item-card-${item._id}`}>
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
            {item.itemName}
          </h3>

          {item.userId && item.userId.name && (
            <div className="flex items-center gap-2 mt-1">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-[10px] text-white font-semibold">
                {item.userId.name.charAt(0).toUpperCase()}
              </div>
              <p className="text-xs text-slate-500 truncate">
                {item.userId.name}
              </p>
            </div>
          )}
        </div>

        <span className={`${item.type === 'Lost' ? 'badge-lost' : 'badge-found'} shrink-0`}>
          {item.type}
        </span>
      </div>

      {/* Description */}
      {item.description && (
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      )}

      {/* Metadata */}
      <div className="space-y-3 mb-5">
        
        {item.location && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-slate-300 truncate">
              {item.location}
            </span>
          </div>
        )}

        {item.date && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-slate-300">
              {formatDate(item.date)}
            </span>
          </div>
        )}

        {item.contactInfo && (
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-slate-300 truncate">
              {item.contactInfo}
            </span>
          </div>
        )}

      </div>

      {/* Spacer */}
      <div className="mt-auto"></div>

      {/* Actions */}
      <div className="divider-gradient mb-3"></div>

      <div className="flex items-center gap-2">
        <Link
          to={`/items/${item._id}`}
          className="flex-1 text-center h-[40px] flex items-center justify-center rounded-lg text-sm font-medium text-blue-400 hover:bg-blue-500/10 transition-all"
          id={`view-item-${item._id}`}
        >
          View Details
        </Link>

        {isOwner && (
          <>
            <Link
              to={`/items/${item._id}/edit`}
              className="h-[40px] px-4 flex items-center justify-center rounded-lg text-sm font-medium text-amber-400 hover:bg-amber-500/10 transition-all"
              id={`edit-item-${item._id}`}
            >
              Edit
            </Link>

            <button
              onClick={() => onDelete && onDelete(item._id)}
              className="h-[40px] px-4 flex items-center justify-center rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer bg-transparent border-none"
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