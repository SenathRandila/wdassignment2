const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');

// Load environment variables
dotenv.config();

// Initialize app and connect to MongoDB
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', productRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to DressStore application.' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({ message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
