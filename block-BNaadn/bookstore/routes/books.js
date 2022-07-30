var express = require('express');
var router = express.Router();

var Book = require('../models/book');
var Author = require('../models/author');

/* GET users listing. */

router.get('/', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    res.render('booklist', { books });
  });
});

router.get('/new', (req, res) => {
  res.render('bookForm');
});

router.post('/', (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if (err) return next(err);
    Author.findOneAndUpdate(
      { name: book.author },
      { $push: { books: book._id } },
      (err, updatedAuthor) => {
        res.redirect('/books');
      }
    );
  });
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    var categories = book.category[0].split(',');
    res.render('bookDetail', { book, categories });
  });
});

router.get('/:id/edit', (req, res) => {
  var id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    res.render('editBookForm', { book });
  });
});

router.post('/:id', (req, res) => {
  var id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, updatedBook) => {
    if (err) return next(err);
    res.redirect('/books/' + id);
  });
});

router.get('/:id/delete', (req, res) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, deletedBook) => {
    if (err) return next(err);
    res.redirect('/books');
  });
});

module.exports = router;
