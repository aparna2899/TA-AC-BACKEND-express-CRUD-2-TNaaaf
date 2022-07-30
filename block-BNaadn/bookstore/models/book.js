var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: { type: String, required: true },
  summary: String,
  pages: Number,
  publication: String,
  cover_image: String,
  category: [{ type: String, required: true }],
  author: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'Author' },
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
