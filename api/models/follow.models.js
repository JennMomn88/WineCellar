const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Hace referencia al modelo de usuario
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Hace referencia al usuario que está siendo seguido
      required: true,
    },
  },
  { timestamps: true }
);

// Evita que un usuario siga al mismo usuario más de una vez
followSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
