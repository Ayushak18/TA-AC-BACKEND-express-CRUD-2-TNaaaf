let express = require('express');
let router = express.Router();
let Book = require('../models/books');
let Author = require('../models/author');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Book.find({}, (error, books) => {
    if (error) {
      next(error);
    } else {
      res.render('books', { books: books });
    }
  });
});

router.get('/new', (req, res) => {
  res.render('newBookForm');
});

router.post('/', (req, res, next) => {
  // req.body.bookID =
  Author.create(req.body, (error, author) => {
    if (error) {
      next(error);
    } else {
      req.body.authorID = author.id;
      Book.create(req.body, (error, book) => {
        if (error) {
          next(error);
        } else {
          res.redirect('/books');
        }
      });
    }
  });
});

router.get('/:id', (req, res, next) => {
  let bookId = req.params.id;
  Book.findById(bookId)
    .populate('authorID')
    .exec((error, book) => {
      if (error) {
        next(error);
      } else {
        res.render('singleBook', { book: book });
      }
    });
});

router.get('/:id/edit', (req, res) => {
  let bookId = req.params.id;
  Book.findById(bookId)
    .populate('authorID')
    .exec((error, book) => {
      if (error) {
        next(error);
      } else {
        res.render('bookEditForm', { book: book });
      }
    });
});

router.post('/:id', (req, res, next) => {
  let bookId = req.params.id;
  Book.findByIdAndUpdate(bookId, req.body, (error, book) => {
    if (error) {
      next(error);
    } else {
      Author.findByIdAndUpdate(book.authorID, req.body, (error, author) => {
        if (error) {
          next(error);
        } else {
          res.redirect('/books/' + bookId);
        }
      });
    }
  });
});

router.get('/:id/delete', (req, res) => {
  let bookId = req.params.id;
  Book.findByIdAndRemove(bookId, (error, book) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/books');
    }
  });
});

module.exports = router;
