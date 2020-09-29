const express = require('express');
const passport = require('passport');
const validateEmailHostname = require('validate-email-hostname').default;

const userRouter = express.Router();
const User = require('../models/user.model');
const Institution = require('../models/institution.model');

userRouter.route('/users')
  .get((req, res) => {
    User.find((err, users) => {
      if (err) return res.json({ status: 500, err });
      res.json({ status: 200, users });
    });
  });

userRouter.route('/users/create')
  .post( async (req, res) => {
    const validEmail = await validateEmailHostname(req.body.email).catch((err) => {
      res.json({ status: 500, err })
    });
    if (!validEmail) return res.json({ status: 400, message: 'Invalid email domain'});
    let user = new User();
    let institutionDomain = req.body.email.split('@')[1];
    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;
    user.password = req.body.password;

    let institution = new Institution(
      {
        domain: institutionDomain,
        // set these to the domain by default
        name: institutionDomain,
        url: institutionDomain,
      }
    );

    // If institution does not exist in db but is valid domain, create it
    Institution.findOneAndUpdate({ domain: institutionDomain }, institution, { new: true }, (err, data) => {
      if (err) return res.json({ status: 500, err });
      if (!data) institution.save((err) => {
        if (err) return res.json({ status: 500, err });
      })
    });

    user.institution = institution;

    user.save((err) => {
      if (err) return res.json({ status: 500, err });
      res.json({ status: 201, message: `Successfully created user ${user.name} at ${user.institution}` });
    });
  });

userRouter.route('/users/:user_id')
  .get((req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) return res.json({ status: 500, err });
      res.json({ status: 200, user });
    });
  });

module.exports = userRouter;
