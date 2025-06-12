import express from 'express';
import { createTask, getTasks, updateTaskStatus } from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTask);
router.get('/:projectId', protect, getTasks);
router.patch('/:taskId/status', protect, updateTaskStatus);

export default router;
