// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Import routes
import studentRoutes from './routes/studentRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/authRoutes.js';


dotenv.config();
const app = express();

// Middlewares

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/schools', schoolRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin', adminRoutes);


app.get('/', (req, res) => res.send("SaaS School API is Running..."));

// Database Connection
const MONGO_URI = process.env.MONGO_URI 

mongoose.connect(MONGO_URI)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch(err => console.error(" DB Connection Error:", err));

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
