import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Task Manager</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/notifications" className="hover:underline">Notifications</Link>
        </nav>
        <div className="mt-auto">
          <p className="text-sm">Logged in as:</p>
          <p className="font-semibold">{user?.name}</p>
          <button
            onClick={handleLogout}
            className="mt-2 text-red-400 hover:underline text-sm"
          >
            Logout
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;