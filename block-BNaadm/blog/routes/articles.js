var express = require('express');
var router = express.Router();

var Article = require('../models/article');
var Comment = require('../models/comment');

/* GET users listing. */

//view articles list
router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render('articlelist', { articles: articles });
  });
});

//create new article form
router.get('/new', (req, res) => {
  res.render('articleForm');
});

//create an article
router.post('/', (req, res, next) => {
  Article.create(req.body, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

//get article details
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id)
    .populate('comments')
    .exec((err, article) => {
      if (err) return next(err);
      res.render('articleDetail', { article: article });
    });
  // Article.findById(id, (err, article) => {
  //   if (err) return next(err);
  //   Comment.find({ articleId: id }, (err, comments) => {
  //     res.render('articleDetail', { article, comments });
  //   });
  // });
});

//update article form
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render('articleEditForm', { article });
  });
});

//update article
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

//delete article
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    Comment.deleteMany({ articleId: article.id }, (err, info) => {
      res.redirect('/articles');
    });
  });
});

//add comment
router.post('/:id/comments', (req, res, next) => {
  var id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      (err, updatedArticle) => {
        res.redirect('/articles/' + id);
      }
    );
  });
});

module.exports = router;
