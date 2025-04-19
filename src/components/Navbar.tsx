import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTheme } from '../hooks/useTheme';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { useLogout } from '../redux/useLogout';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const user = useSelector((state: RootState) => state.auth.user);
  const logout = useLogout();

  return (
    <nav className="bg-[var(--nav-bg)] text-[var(--nav-text)] shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Team Steam</h1>
          
          <div className="flex items-center gap-4">
            {user?.email && (
              <span className="text-sm">{user.email}</span>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--primary-light)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>
            {user && (
              <button
                onClick={logout}
                className="p-2 rounded-full hover:bg-[var(--primary-light)] transition-colors"
                aria-label="Logout"
              >
                <FaSignOutAlt size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}