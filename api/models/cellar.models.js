const mongoose = require('mongoose');

const cellarSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // Aqui nos aseguramos que un usuario solo tiene un cellar
    },
    name: {
      type: String,
      trim: true,
      default: 'Mi Bodega',
    },
    title: {
      type: String,
      trim: true,
      default: 'Cellar Privado',
    },
    description: {
      type: String,
      trim: true,
      default: 'No ahi descripcion',
    },
    marketValue: {
      type: Number,
      default: 0,
    },
    wines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wine' }], //los vinos que tenemos en el cellar.
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

const Cellar = mongoose.model('Cellar', cellarSchema);
module.exports = Cellar;
