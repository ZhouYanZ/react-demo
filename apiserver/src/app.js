const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/secrets');

// Controllers (route handlers)
const homeController = require('./controllers/home');
const userController = require('./controllers/user');

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose
  .connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB connection success');
  })
  .catch(err => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running.'
    );
  });

// Express configuration
app.set('port', process.env.PORT || 9090);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.post('/login', userController.postLogin); // 用户登录
app.post('/signup', userController.postSignup); // 用户注册

/**
 * API examples routes.
 */

/**
 * Error
 */
app.use((err, req, res, next) => {
  res.send({
    code: -1000,
    msg: err.message
  });
});

module.exports = app;
