import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
// Import page components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import TaskPage from "./pages/TaskPage";
import NotificationsPage from "./pages/NotificationsPage";
import Layout from "./components/Layout";
// Protected route wrapper
function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}
function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/project/:id"
          element={
            <PrivateRoute>
              <ProjectPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <PrivateRoute>
              <TaskPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <NotificationsPage />
            </PrivateRoute>
          }
        />
        <Route
          element={
            
              <Layout />
           
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
