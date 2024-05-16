const Product = require('../models/productModel.js');

exports.createProduct = async(req,res)=>{
    try{
        //const dataFile =  req.file.path;
        //req.body.image = dataFile;
        const userData = req.body;
        const newUser = Product(userData);
        const response = await newUser.save();
        res.status(201).json({
            status:"success",
            response
        })
    }catch(err){
        
        console.log(err);
        res.status(500).json({
            error:"internal server error"
        })
    }

};

exports.getAllProduct = async(req, res)=>{
  try{
    const { category , name } = req.query
    console.log(name);
    const filter = {};
    if (category) {
      filter.category = category;
    }
    const productData= await Product.find(filter);
    res.status(200).json({
        productData
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
        error:"internal server error"
    })
  }
};

exports.getProduct = async(req,res)=>{
    try{
        const productData = await Product.findById(req.params.id);
        if(!productData){
            res.status(404).json({
                error:"product not found with that id , Please send valid id"
            })
        };
        res.status(200).json({
            productData
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"internal server error"
        })
    }
};

exports.updateProduct = async(req,res)=>{
    try{
        const productId  = req.params.id;
        const productData = req.body;
        
        const response = await Product.findByIdAndUpdate(productId,productData,{
          new:true,
          runValidators:true
        })
        if(!response){
         return res.status(404).json({
             error:"product not found with that id , Please send valid id"
         })
        }
        res.status(200).json({
         data:response
     })
     }catch(err){
        console.log(err);
        res.status(500).json({
            error:"internal server error"
        })
     }
};

exports.deleteProduct = async(req,res)=>{
    try{
        const productData = await Product.findByIdAndDelete(req.params.id);
        if(!productData){
            res.status(404).json({
                error:"product not found with that id "
            })
        }
        res.status(200).json({
            message:"done"
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"internal server error"
        })
    }
}