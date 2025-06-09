import express from 'express';
import dotenv from 'dotenv';
import trialRoutes from './routes/trials.mjs';
import authRoutes from './routes/auth.mjs';

dotenv.config();

const app = express();

app.use (express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/trials', trialRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
