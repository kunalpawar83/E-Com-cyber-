const express = require('express');
const Category = require('../controller/categoryCont.js')
const {jwtAuthMiddleware,generateToken} = require('../utils/jwt.js');
const router = express.Router();


// create category
router.post('/createcategory', jwtAuthMiddleware,Category.createCategory);
// get all category
router.get('/getallcategory',Category.getAllCategory); 

module.exports = router;