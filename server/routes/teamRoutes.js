import express from 'express';
import { createTeam, inviteUser } from '../controllers/teamController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTeam);
router.post('/invite', protect, inviteUser);
export default router;
