const mongoose = require('mongoose');

// Define las notas predefinidas
const predefinedNotes = [
  'Frutal',
  'Terroso',
  'Floral',
  'Especiado',
  'Caramelo',
  'Vegetal',
];

const TastingNoteSchema = new mongoose.Schema({
  wine: { type: mongoose.Schema.Types.ObjectId, ref: 'Wine', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notes: [
    {
      description: {
        type: String,
        enum: predefinedNotes, // Validación para que solo se puedan agregar notas predefinidas
        required: true,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const TastingNote = mongoose.model('TastingNote', TastingNoteSchema);
module.exports = TastingNote;
