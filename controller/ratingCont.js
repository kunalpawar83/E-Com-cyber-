const Rating  =  require('../models/ratingModel.js');


exports.createRating = async(req,res)=>{
    try{
        //const dataFile =  req.file.path;
        //req.body.image = dataFile;
        req.body.userid = req.user.id;
        const userData = req.body;
        const newUser = Rating(userData);
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

} 
