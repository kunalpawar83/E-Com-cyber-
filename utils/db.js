const mongoose  = require('mongoose');

mongoose.connect('mongodb+srv://kunalpawar8319:kunalmain2018@e-com.8zrzv9l.mongodb.net/user');

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected to Mongodb server');
});

db.on('error',(err)=>{
    console.log('mongodb connection error',err);
});

db.on('disconnected',()=>{
    console.log('mongodb server disconnected');
});


module.exports = db;