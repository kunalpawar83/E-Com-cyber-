const express = require('express');
const Category = require('../controller/categoryCont.js')
const router = express.Router();


// create category
router.post('/createcategory',Category.createCategory);
// get all category
router.get('/getallcategory',Category.getAllCategory);

module.exports = router;