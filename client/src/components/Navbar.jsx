import { useAuth } from '../context/AuthContext'; // Optional
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth() || {}; // falls AuthContext eingebunden ist

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">RemoteTask</Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/projects" className="text-gray-700 hover:text-blue-600">
          Projekte
        </Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{user.name}</span>
            <button
              onClick={logout}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;