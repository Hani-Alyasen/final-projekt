import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const Column = ({ status, title, tasks, moveTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-80 min-h-[400px] p-4 rounded-lg border ${
        isOver ? 'bg-blue-100' : 'bg-gray-50'
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;
