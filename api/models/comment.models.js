const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    wine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wine',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isPublic: {
      // Comentario público o privado
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    parentComment: {
      // Comentario al que pertenecen los demas.
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },

    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._v;
        delete ret._id;
        ret.id = doc.id;
        return ret;
      },
    },
  }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
