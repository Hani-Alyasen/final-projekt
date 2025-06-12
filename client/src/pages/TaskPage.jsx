import { useParams } from 'react-router-dom';
function TaskPage() {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <p>Task ID: {id}</p>
      <p>This page will show task info and comments.</p>
    </div>
  );
}
export default TaskPage;