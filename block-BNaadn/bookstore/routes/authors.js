var express = require('express');
var router = express.Router();

var Author = require('../models/author');
var Book = require('../models/book');

router.get('/:name', (req, res) => {
  var name = req.params.name;
  Author.find({ name: name }, (err, author) => {
    if (err) return next(err);
    res.render('authorDetail', { author: author });
  });
});

router.get('/new', (req, res) => {
  res.render('authorForm');
});

module.exports = router;
