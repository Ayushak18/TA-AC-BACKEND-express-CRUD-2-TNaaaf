let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: String,
    pages: Number,
    publication: String,
    coverImage: String,
  },
  { timestamps: true }
);

let Book  = mongoose.model('book',bookSchema);

module.exports = Book;