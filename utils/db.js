const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://kunalpawarcyberinstant:kunalmain2018@e-com-cyberinstant.6gqwswc.mongodb.net/user');
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};


module.exports = {connectDB};
// 'mongodb+srv://kunalpawar8319:kunalmain2018@e-com.8zrzv9l.mongodb.net/user'