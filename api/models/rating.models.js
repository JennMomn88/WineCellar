const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  wine: { type: mongoose.Schema.Types.ObjectId, ref: 'Wine', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, min: 1, max: 5, required: true },
});

// Evita que un usuario califique un vino más de una vez
RatingSchema.index({ wine: 1, user: 1 }, { unique: true });

const Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;
