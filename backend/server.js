import express from "express";
import connectDB from "./db/db.js";
import cors from "cors"
import path from 'path';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes.js'
const __dirname = path.resolve();
dotenv.config();




const app = express();

const PORT = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();

// Middleware





app.use(express.json());
app.use(
  cors({
    origin: 'https://note-7pl0.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
);



app.use('/api/notes', noteRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));