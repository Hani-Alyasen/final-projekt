import { useParams } from 'react-router-dom';
function ProjectPage() {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Details</h1>
      <p>Project ID: {id}</p>
      <p>Here you'll show tasks in a Kanban board layout.</p>
    </div>
  );
}
export default ProjectPage;