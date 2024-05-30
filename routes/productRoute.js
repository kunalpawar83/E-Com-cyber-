const express = require('express');
const router  = express.Router();
const Prodcut = require('../controller/productCont.js');
const {jwtAuthMiddleware} = require('../utils/jwt.js');
const path = require('path');

const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'imgProduct');
    },
    filename:(req,file,cb)=>{
       const ext = file.mimetype.split('/')[1];
       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
 });
 
 const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
       cb(null,true);
    }else{
       cb('Not a image ! please upload image',false);
    }
 }
 
 const upload =  multer({
    storage:multerStorage,
    fileFilter:multerFilter   
 });
 

// create product 
router.post('/createproduct',upload.single('image'),Prodcut.createProduct);
// get all product
router.get('/getallproduct',Prodcut.getAllProduct);
// get product
router.get('/getproduct/:id',Prodcut.getProduct);
// update product
router.put('/updateproduct/:id',Prodcut.updateProduct);
// delete product
router.delete('/deleteproduct/:id',Prodcut.deleteProduct);


/////////////////////////////////////////////////////////////////////////
// rating of product
router.post('/ratingproduct/:id',jwtAuthMiddleware,Prodcut.ratingProduct);
// rating product
router.get('/getallrating/:id',jwtAuthMiddleware,Prodcut.getaAllRating);


module.exports = router;