const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { connectDB } =  require('./utils/db.js');
const PORT = process.env.PORT;

const app = express()

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.get('/',(req,res)=>{
//     res.status(200).json({
//         status:"hello",
//         message:"kunal pawar"
//     })
// })

app.get('/login',(req,res)=>{
    res.status(200).json({
        status:"hello",
        message:"kunal pawar"
    })
})

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  });