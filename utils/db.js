const mongoose = require("mongoose");
const catchAsync = require("./catchAsync.js");
const apperror = require("./appError.js");

const connectDB = async () => {

    await mongoose.connect('mongodb+srv://kunalpawarcyberinstant:kunalmain2018@cluster0.8g5x7yn.mongodb.net/user?retryWrites=true&w=majority')
    .then(() => console.log("MongoDB connected"))
};


module.exports = {connectDB};
// 'mongodb+srv://kunalpawar8319:kunalmain2018@e-com.8zrzv9l.mongodb.net/user'