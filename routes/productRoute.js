const express = require('express');
const router  = express.Router();
const Prodcut = require('../controller/productCont.js');
const {jwtAuthMiddleware} = require('../utils/jwt.js');

const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'imgProduct');
    },
    filename:(req,file,cb)=>{
       const ext = file.mimetype.split('/')[1];
       cb(null,`user-${Date.now()}.${ext}`);
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
router.post('/createproduct',upload.single('image'),jwtAuthMiddleware,Prodcut.createProduct);
// get all product
router.get('/getallproduct',Prodcut.getAllProduct);
// get product
router.get('/getproduct',Prodcut.getProduct);
// update product
router.put('/updateproduct',Prodcut.updateProduct);
// delete product
router.delete('/deleteproduct',Prodcut.deleteProduct);



module.exports = router;