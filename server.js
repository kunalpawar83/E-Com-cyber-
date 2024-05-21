const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { connectDB } =  require('./utils/db.js');
const PORT = process.env.PORT;
const userRoute = require('./routes/userRoute.js')
const productRoute = require('./routes/productRoute.js');
const categoryRoute = require('./routes/categoryRoute.js');
const ratingRoute = require('./routes/ratingRoute.js');
const logger = require('./utils/logger.js');

const app = express()

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/user',userRoute);
app.use('/product',productRoute);
app.use('/category',categoryRoute);
app.use('/rating',ratingRoute);

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  });