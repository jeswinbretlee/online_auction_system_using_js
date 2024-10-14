// server/config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
// server/config/config.js
require('dotenv').config();

const config = {
    db: {
        url: process.env.MONGODB_URI|| 'mongodb://localhost:27017/myDatabase',
    },
    server: {
        port: process.env.PORT || 3000,
    },
};

module.exports = config;

const connectDB = async () => {
    try {
        await mongoose.connect(config.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
