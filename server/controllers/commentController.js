import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  const { taskId } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.create({
      text,
      task: taskId,
      user: req.user._id,
    });

    const populatedComment = await comment.populate('user', 'name email');
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getComments = async (req, res) => {
  const { taskId } = req.params;

  try {
    const comments = await Comment.find({ task: taskId })
      .populate('user', 'name email')
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
