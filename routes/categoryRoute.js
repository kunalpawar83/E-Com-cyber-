const express = require('express');
const Category = require('../controller/categoryCont.js')
const {jwtAuthMiddleware,generateToken} = require('../utils/jwt.js');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Secret key used for JWT

// Middleware function to verify token
const verifyToken = (req, res, next) => {
  // Check for token in headers, query parameters, or request body
  const token = req.headers.authorization || req.query.token || req.body.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  // Verify token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    // Token is valid, store decoded payload for further processing
    req.decoded = decoded;
    next(); // Proceed to next middleware or route handler
  });
};


// create category
router.post('/createcategory', jwtAuthMiddleware,Category.createCategory);
// get all category
router.get('/getallcategory',verifyToken,Category.getAllCategory); 

module.exports = router;