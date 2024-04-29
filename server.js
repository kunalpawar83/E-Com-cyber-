const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

//const db  = require('./utils/db.js');

const app = express()

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.get('/',(req,res)=>{
//     res.status(200).json({
//         status:"hello",
//         message:"kunal pawar"
//     })
// })

app.get('/kunal',(req,res)=>{
    res.status(200).json({
        status:"hello",
        message:"kunal pawar"
    })
})
app.listen(process.env.PORT,()=>{
     console.log('listening on port',process.env.PORT);
})