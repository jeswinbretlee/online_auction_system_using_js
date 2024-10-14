// server/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const { getUserDetails, DeleteProduct, AddProduct, GetCart, DeleteCart, AddCart, GetProduct } = require('../controllers/homeController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

const authrouter = express.Router();
authrouter.get('/getUserDetails', getUserDetails);
authrouter.get('/getProduct', GetProduct);
authrouter.get('/addProduct', AddProduct);
authrouter.get('/deleteProduct:Id', DeleteProduct);
authrouter.get('/addCart:Id', AddCart);
authrouter.get('/deleteCart:Id', DeleteCart);
authrouter.get('/getCart', GetCart);

module.exports = { router, authrouter };