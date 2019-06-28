const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/secrets');

// Controllers (route handlers)
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const gradeController = require('./controllers/grade');
const studentController = require('./controllers/student');

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
  res.set('Access-Control-Allow-Headers', 'content-type');
  res.set('Access-Control-Allow-Methods', 'get, post, delete, put, update');
  next();
});

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.post('/sign-in', userController.postSignIn); // 用户登录
app.post('/sign-up', userController.postSignUp); // 用户注册

/**
 * API routes.
 */
app
  .route('/api/grade/:id?')
  .get(gradeController.getGradeList)
  .post(gradeController.createGrade)
  .delete(gradeController.deleteGrade);
app
  .route('/api/student/:id?')
  .get(studentController.getStudentList)
  .post(studentController.addStudent)
  .delete(studentController.delStudent);

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
