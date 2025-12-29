import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import connectDB from './config/db.mjs';
import { notFound, errorHandler } from './middleware/errorHandler.mjs';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Initialize express
const app = express();

// Connect database
connectDB();

// Routes (ESM syntax)
import paymentRoutes from './routes/paymentRoutes.mjs';
import productRoutes from './routes/productRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import cartRoutes from './routes/cartRoutes.mjs';
import orderRoutes from './routes/orderRoutes.mjs';
import adminRoutes from './routes/adminRoutes.mjs';

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const corsOptions = {
  origin: [
    'http://127.0.0.1:5500',
    'https://fortex.com.mk',
    'https://fortexadmin.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Test route
app.get('/', (req, res) => {
  res.send('Server is running on port 0.0.0.0');
});

// Static files
app.use('/designs', express.static(path.join(__dirname, 'public/designs')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Mount routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Error middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 2300;
// For NGINX proxy
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on 0.0.0.0:${PORT}`);
});







