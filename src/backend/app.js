// src/backend/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

import bookRoutes from './routes/bookRoutes.js';
// Routes
// This comment line is needed for Plop to insert new routes
import bookRoutes from './routes/bookRoutes.js';
// Routes

app.use('/api/books', bookRoutes);

// Root health-check
app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;
