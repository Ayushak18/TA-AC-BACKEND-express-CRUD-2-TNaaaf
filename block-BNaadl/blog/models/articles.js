let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: String,
  description: String,
  tags: [String],
  author: String,
  likes: Number,
});

let Article = mongoose.model('article', articleSchema);

module.exports = Article;
