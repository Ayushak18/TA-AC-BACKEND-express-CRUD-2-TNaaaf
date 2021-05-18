var express = require('express');
var router = express.Router();
let Article = require('../models/articles');

/* GET home page. */
router.get('/', function (req, res, next) {
  Article.find({}, (error, users) => {
    if (error) {
      next(error);
    } else {
      res.render('articles', { users: users });
    }
  });
});

router.get('/new', (req, res, next) => {
  res.render('newArticle');
});

router.post('/', (req, res, next) => {
  Article.create(req.body, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/articles');
    }
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.render('oneArticle', { user: user });
    }
  });
});

router.get('/:id/edit', (req, res, error) => {
  let id = req.params.id;
  Article.findById(id, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.render('updateUser', { user: user });
    }
  });
});

router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/articles/' + id);
    }
  });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndDelete(id, (error) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/articles');
    }
  });
});

module.exports = router;
