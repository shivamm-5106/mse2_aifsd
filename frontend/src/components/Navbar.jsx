import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center gap-3 group" id="nav-logo">
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="absolute -inset-1 rounded-[16px] bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Lost & Found
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider uppercase">
                Community Portal
              </span>
            </div>
          </Link>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2">

            {/* NAV LINKS */}
            <div className="flex items-center gap-1 bg-white/[0.02] px-2 py-1 rounded-xl border border-white/5">

              <Link
                to="/search"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive('/search')
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive('/dashboard')
                        ? 'text-blue-400 bg-blue-500/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/items/new"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive('/items/new')
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Report
                  </Link>
                </>
              )}
            </div>

            {/* AUTH SECTION */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-2">

                {/* USER */}
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm text-slate-300 hidden sm:inline max-w-[110px] truncate">
                    {user?.name}
                  </span>
                </div>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive('/login')
                      ? 'text-white bg-white/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn-gradient text-sm px-5 py-2 rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;