import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import authRoutes from './routes/authRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import testRoutes from './routes/testRoutes.js'; // Import test routes
import cors from 'cors';


dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/test', testRoutes);


// Routes will go here
app.get('/', (req, res) => {
  res.send('API is running...');
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
