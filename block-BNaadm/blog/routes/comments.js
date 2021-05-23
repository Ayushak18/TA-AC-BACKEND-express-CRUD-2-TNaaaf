let express = require('express');
let router = express.Router();
let Comment = require('../models/comments');
let Article = require('../models/articles');

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Comment.findById(id, (error, comment) => {
    if (error) {
      next(error);
    } else {
      res.render('commentUpdate', { comment: comment });
    }
  });
});

router.post('/:id/update', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (error, comment) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/articles/' + comment.articleId);
    }
  });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndRemove(id, (error, comment) => {
    if (error) {
      next(error);
    } else {
      Article.findByIdAndUpdate(
        comment.articleId,
        { $pull: { comments: comment.id } },
        (error, article) => {
          if (error) {
            next(error);
          } else {
            res.redirect('/articles/' + comment.articleId);
          }
        }
      );
    }
  });
});

module.exports = router;
