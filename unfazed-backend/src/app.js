import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import therapistRoutes from './routes/therapistRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import schedulingRoutes from './routes/schedulingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/therapist', therapistRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/scheduling', schedulingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);

export default app;
