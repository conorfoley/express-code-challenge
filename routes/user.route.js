const express = require('express');

const userRouter = express.Router();

const User = require('../models/user.model');

const passport = require('passport');

userRouter.route('/users')
  .get((req, res) => {
    User.find((err, users) => {
      if (err) res.json({ status: 500, err });
      console.log('USERS', users);
      res.json({ status: 200, users });
    });
  });

userRouter.route('/users/create')
  .post((req, res) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;
    user.password = req.body.password;

    user.save((err) => {
      if (err) res.json({ status: 500, err });
      console.log('USER', user);
      res.json({ status: 201, message: 'Successfully created user ' + user.name });
    });
  });

userRouter.route('/users/:user_id')
  .get((req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) res.json({ status: 500, err });
      res.json({ status: 200, user });
    });
  });

module.exports = userRouter;
