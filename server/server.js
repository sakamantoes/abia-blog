import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './models/index.js';
import errorMiddleware from './middleware/errorMiddleware.js';
// Import routes
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/PostRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import commentRoutes from './routes/CommentRoutes.js';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ['https://lisa-unmodified-noble.ngrok-free.dev', 'http://localhost:5173'],
  credentials: true
}));


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);

// Routes testing
app.use('/', (req, res) => {
  res.send('API is running');
});

// Error handling middleware
app.use(errorMiddleware);

// Database sync and server start
const PORT = process.env.PORT || 8000;

db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to database:', err);
});