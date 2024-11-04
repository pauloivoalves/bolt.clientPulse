import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import { calculateClientHealth } from './utils/healthCalculator.js';

dotenv.config();

const app = express();

// Configure CORS with specific options
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);
app.use('/api', healthRoutes);  
app.use('/api', clientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Update client health every day at midnight
setInterval(async () => {
  try {
    const clients = await Client.find({});
    for (const client of clients) {
      const newHealth = calculateClientHealth(client);
      if (newHealth !== client.health) {
        client.health = newHealth;
        await client.save();
      }
    }
    console.log('Client health updated successfully');
  } catch (error) {
    console.error('Error updating client health:', error);
  }
}, 24 * 60 * 60 * 1000); // Run every 24 hours