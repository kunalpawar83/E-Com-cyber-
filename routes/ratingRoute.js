const express = require('express');
const Rating = require('../controller/ratingCont.js');
const {jwtAuthMiddleware} = require('../utils/jwt.js');
const router = express.Router();


router.post('/createrating',jwtAuthMiddleware,Rating.createRating);

module.exports = router;
 