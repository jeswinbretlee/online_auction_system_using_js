// server/controllers/homeController.js
const Product = require('../models/Product');
const User = require('../models/User');

exports.getUserDetails = async (req, res) => {
    try {
        // Assuming the 'authenticateToken' middleware has added the user info to req.user
        const user = await User.findOne({ username: req.user.username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user details (excluding sensitive info like password)
        const { name, username, email, role, dob, pancard, mobile, country, address } = user;
        res.json({ name, username, email, role, dob, pancard, mobile, country, address });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.AddProduct = async (req, res) => {
    try {
        const { title, description, startingPrice, endTime } = req.body;
        const listing = new Product({ title, description, startingPrice, endTime, seller: req.userId });
        await listing.save();
        res.status(201).send('Listing added');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
exports.GetProduct = async (req, res) => {
    try {
        const listing = await Product.findById(req.params.Id);
        res.json(listing);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.DeleteProduct = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        
        const listingIndex = user.cart.indexOf(req.params.Id);
        if (listingIndex === -1) return res.status(404).send('Listing not in cart');
        
        user.cart.splice(listingIndex, 1);
        await user.save();
        res.status(200).send('Listing removed from cart');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
exports.AddCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const listing = await Product.findById(req.params.Id);
        
        if (!listing) return res.status(404).send('Listing not found');
        if (user.cart.includes(listing._id)) return res.status(400).send('Listing already in cart');
        
        user.cart.push(listing._id);
        await user.save();
        res.status(200).send('Listing added to cart');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
exports.DeleteCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        
        const listingIndex = user.cart.indexOf(req.params.Id);
        if (listingIndex === -1) return res.status(404).send('Listing not in cart');
        
        user.cart.splice(listingIndex, 1);
        await user.save();
        res.status(200).send('Listing removed from cart');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
exports.GetCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('cart');
        res.json(user.cart);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


