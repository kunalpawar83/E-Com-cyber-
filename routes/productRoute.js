const express = require('express');
const router  = express.Router();
const Prodcut = require('../controller/productCont.js');


// create product 
router.post('/createproduct',Prodcut.createProduct);
// get all product
router.get('/getallproduct',Prodcut.getAllProduct);
// get product
router.get('/getproduct',Prodcut.getProduct);
// update product
router.put('/updateproduct',Prodcut.updateProduct);
// delete product
router.delete('/deleteproduct',Prodcut.deleteProduct);



module.exports = router;