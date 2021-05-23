var express = require('express');
var router = express.Router();
let Article = require('../models/articles');
let Comment = require('../models/comments');

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

// router.get('/:id', (req, res, next) => {
//   let id = req.params.id;
//   Article.findById(id, (error, user) => {
//     if (error) {
//       next(error);
//     } else {
//       res.render('oneArticle', { user: user });
//     }
//   });
// });

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id)
    .populate('comments')
    .exec((error, user) => {
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
  Article.findByIdAndDelete(id, (error,article) => {
    if (error) {
      next(error);
    } else {
      Comment.remove({},{articleId:article.id},(error)=>{
        if(error){
          next(error);
        }else{
          res.redirect('/articles');
        }
      })
    }
  });
});

router.post('/:id/comments', (req, res, next) => {
  let id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (error, comment) => {
    if (error) {
      next(error);
    } else {
      Article.findByIdAndUpdate(
        id,
        { $push: { comments: comment.id } },
        (error, article) => {
          if (error) {
            next(error);
          } else {
            res.redirect('/articles/' + id);
          }
        }
      );
    }
  });
});

module.exports = router;
