import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Dashboard() {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  // Fetch projects on load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [token]);
  // Submit project creation
  const handleCreateProject = async () => {
  console.log('Sending:', form);

  try {
    const res = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        deadline: new Date(form.deadline).toISOString(),
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Server error: ${errorText}`);
    }

    const data = await res.json();
    setProjects([...projects, data]);
    setForm({ title: '', description: '', deadline: '' });
    setShowModal(false);
  } catch (err) {
    console.error('Error creating project:', err);
  }
};

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Create New Project
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(
            (project) => (
              console.log("project.deadline →", project.deadline),
              (
                <Link
                  key={project._id}
                  to={`/project/${project._id}`}
                  className="border p-4 rounded shadow hover:shadow-md bg-white transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <h2 className="text-xl font-semibold">{project.title}</h2>
                  </div>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <p className="text-sm mt-2">
                    <strong>Deadline:</strong>{" "}
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Team: {project.team?.name} — {project.team?.members?.length}{" "}
                    members
                  </p>
                </Link>
              )
            )
          )}
        </div>
      )}
      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4 relative">
            <h2 className="text-xl font-bold">Create New Project</h2>
            <input
              type="text"
              placeholder="Project Title"
              name="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
