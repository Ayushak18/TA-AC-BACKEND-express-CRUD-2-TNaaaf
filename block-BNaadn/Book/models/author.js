let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let authorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: String,
    country: String,
  },
  { timestamps: true }
);

let Author = mongoose.model('author',authorSchema);

module.exports = Author;
