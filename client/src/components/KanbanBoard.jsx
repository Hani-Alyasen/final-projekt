import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './Column';
import { useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Login UI', status: 'todo' },
  { id: 2, title: 'API Auth Hook', status: 'in-progress' },
  { id: 3, title: 'Create DB Schema', status: 'done' },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 p-4 overflow-x-auto">
        {columns.map((col) => (
          <Column
            key={col.id}
            status={col.id}
            title={col.title}
            tasks={tasks.filter((task) => task.status === col.id)}
            moveTask={moveTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;