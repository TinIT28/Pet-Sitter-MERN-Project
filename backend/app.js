const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require("dotenv");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Config
dotenv.config({ path: 'backend/config/config.env' });

// Route Imports
const product = require('./routes/productRoutes');
const user = require('./routes/userRoutes');
const order = require('./routes/orderRoutes');
const post = require('./routes/postRoutes');
const payment = require('./routes/paymentRoutes');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', post);
app.use('/api/v1', payment)
// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
