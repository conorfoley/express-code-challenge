const express = require('express');
const institutionRouter = express.Router();
const User = require('../models/user.model');
const Institution = require('../models/institution.model');
const Book = require('../models/book.model');

institutionRouter.route('/institutions')
  .get((req, res) => {
    Institution.find((err, institutions) => {
      if (err) return res.json({ status: 500, err });
      res.json({ status: 200, institutions });
    });
  })
  .post((req, res) => {
    let institution = new Institution({
      name: req.body.name,
      domain: req.body.domain,
      url: req.body.url,
    });

    institution.save((err) => {
      if (err) return res.json({ status: 500, err });
      res.json({ status: 201, message: 'Successfully created institution ' + institution.name});
    });
  });

institutionRouter.route('/institutions/:institution_id')
  .get((req, res) => {
    Institution.findById(req.params.institution_id, (err, institution) => {
      if (err) return res.json({ status: 500, err });
      res.json({ status: 200, institution });
    });
  })
  .put((req, res) => {
    Institution.findById(req.params.institution_id, (err, institution) => {
      if (err) return res.json({ status: 500, err });
      institution.name = req.body.name || institution.name;
      institution.domain = req.body.domain || institution.domain;
      institution.url = req.body.url || institution.url;
      let book = new Book(req.body.books);
      institution.books.push(book);

      book.save((err) => {
        if (err) return res.json({ status: 500, err });
      });

      institution.save((err) => {
        if (err) return res.json({ status: 500, err });
        res.json({ status: 201, message: 'Successfully updated institution ' + institution.name});
      });


    });

  })

module.exports = institutionRouter;
