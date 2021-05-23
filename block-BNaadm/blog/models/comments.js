let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
    },
    author: String,
  },
  { timestamps: true }
);

let Comment = mongoose.model('comment',commentSchema);

module.exports = Comment;
