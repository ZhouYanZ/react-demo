const UserModel = require('../models/User');

/**
 * POST /login
 * 用户登录
 */
const postLogin = (req, res, next) => {
  UserModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) return next(err);

    if (!user) return res.send({ code: -1, msg: '用户名或密码错误' });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return next(err);

      if (!isMatch) return res.send({ code: -1, msg: '用户名或密码错误' });

      res.send({ code: 0, msg: 'ok' });
    });
  });
};

/**
 * POST /signup
 * 用户注册
 */
const postSignup = (req, res, next) => {
  const user = new UserModel({
    email: req.body.email,
    password: req.body.password
  });

  UserModel.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) {
      return res.send({ code: -1, msg: '用户已存在' });
    }

    user.save(err => {
      if (err) next(err);
      res.send({ code: 0, msg: '注册成功' });
    });
  });
};

module.exports = {
  postLogin,
  postSignup
};
