import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';
import contactRoutes from './routes/contact.route';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Basic configurations
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
connectDB().catch((err) => {
  console.error('[db] Connection failed:', err.message);
  process.exit(1);
});

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: Date.now()
  });
});

// API Routes
app.use('/api', contactRoutes);

// Production: Serve static built client
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.resolve(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Error handler (must be last middleware)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
