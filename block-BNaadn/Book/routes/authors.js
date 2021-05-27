let express = require('express');
let router = express.Router();
let Book = require('../models/books');
let Author = require('../models/author');

router.get('/', (req, res) => {
  res.render('newAuthor');
});

router.post('/', (req, res, next) => {
  Author.create(req.body, (error, author) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/books');
    }
  });
});

module.exports = router;
