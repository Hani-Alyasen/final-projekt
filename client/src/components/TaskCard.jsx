import { useDrag } from 'react-dnd';

const TaskCard = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 mb-3 rounded shadow bg-white cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <p className="text-sm font-medium">{task.title}</p>
    </div>
  );
};

export default TaskCard;
