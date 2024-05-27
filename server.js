const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { connectDB } =  require('./utils/db.js');
const PORT = process.env.PORT;
const userRoute = require('./routes/userRoute.js')
const productRoute = require('./routes/productRoute.js');
const categoryRoute = require('./routes/categoryRoute.js');
const logger = require('./utils/logger.js');
const appError = require('./utils/appError.js');
const gobalErrorHandler = require('./controller/errorCont.js')

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

app.all('*', (req, res,next) => {
    // const  err = new Error(`Can't find ${req.originalUrl} on this server!`, 404);
    // err.status = 'fail';
    // err.statusCode = 404;
    next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(gobalErrorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  });