import Task from '../models/Task.js';
import Notification from '../models/Notification.js'; // Add this at the top


export const createTask = async (req, res) => {
  const { title, description, status, dueDate, assignee, project } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      assignee,
      project,
    });
    // Create notification for assignee
if (assignee) {
  await Notification.create({
    user: assignee,
    message: `You were assigned a new task: ${title}`,
    link: `/tasks/${task._id}` // optional, depends on frontend
  });
}


    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ project: projectId })
      .populate('assignee', 'name email')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// //684a960729abc3f594058b49 684a960729abc3f594058b49 {
//   "_id": "684b123abc456def7890abcd",
//   ...
// }
