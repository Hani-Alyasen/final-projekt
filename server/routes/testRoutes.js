// routes/test.routes.js
import express from 'express';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await sendEmail({ to, subject, text });
    res.json({ message: 'Email sent!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
