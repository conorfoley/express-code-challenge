const express = require('express');
const bookRouter = express.Router();
const User = require('../models/user.model');
const Institution = require('../models/institution.model');
const Book = require('../models/book.model');

bookRouter.route('/books')
  .get((req, res) => {
    Book.find((err, books) => {
      if (err) res.json({ status: 500, err });
      res.json({ status: 200, books });
    });
  })
  .post((req, res) => {
    let book = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
    });

    book.save((err) => {
      if (err) res.json({ status: 500, err });
      res.json({ status: 201, message: 'Successfully created book ' + book.title });
    });
  });

module.exports = bookRouter;
