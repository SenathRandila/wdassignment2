const Product = require('../models/product');
const asyncHandler = require('express-async-handler');

// Get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Create a new product
exports.createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, quantity, category } = req.body;

    if (!name || !description || price == null || quantity == null || !category) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
});

// Update a product by ID
exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.json(product);
});

// Delete a product by ID
exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.json({ message: 'Product deleted' });
});
