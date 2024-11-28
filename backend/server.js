import express from "express";
import connectDB from "./db/db.js";
import cors from "cors";
import path from 'path';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://note-7pl0.onrender.com', // Allow only your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow required methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
  credentials: true, // Allow cookies to be sent (if necessary)
};

app.use(cors(corsOptions)); // Apply CORS middleware

// Middleware
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
