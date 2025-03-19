const mongoose = require('mongoose');
const { isURL } = require('../validator/string.validators');

const wineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String, // El tipo de datos será texto
      required: false, // Si deseas que la descripción sea opcional
      maxlength: 500, // Limitar la longitud de la descripción (opcional)
    },
    country: {
      // Pais de origen del vino
      type: String,
      required: true,
    }, // Pais de origen del vino
    city: { type: String, required: true }, // Ciudad del vino
    grapeVariety: { type: String, required: true }, // Variedad de uva
    price: {
      type: Number,
      default: 8.99, // Precio por defecto si no se proporciona
    },
    avb: {
      type: Number,
      default: 14, //porcentaje de Alchool por defecto
    },
    label: {
      type: String, // Definimos que es un valor booleano
      default: false, // Valor por defecto si no se proporciona
      validate: {
        validator: isURL,
        message: function () {
          return 'Invalid poster URL';
        },
      },
    },

    image: {
      type: String,
      default:
        'https://images.vexels.com/media/users/3/489/raw/6969bee1701e6718e52f7856ecc09209-vector-de-botella-de-vino-tinto.jpg', // Imagen por defecto si no anade ninguna, tengo que anadir la url.
      validate: {
        validator: isURL,
        message: function () {
          return 'Invalid poster URL';
        },
      },
    },
    // location: {
    //   type: { type: String, enum: ['Point'], required: true }, // localizacion ?? mirar mejor como hacerlo en mapa
    //   coordinates: { type: [Number], required: true }, // coordenadas [longitud, latitud]
    // },
    winery: { type: String, required: true }, // bodega a la que pertenece
    winetype: {
      type: String,
      enum: ['Tinto', 'Blanco', 'Rosado', 'Espumoso'],
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // usuario que lo agrego
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,

      transform: function (doc, ret) {
        delete ret._v;
        delete ret._id;
        ret.id = doc.id;
        return ret;
      },
    },
  }
);

wineSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'wine',
  justOne: false,
});

wineSchema.virtual('ratings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'wine',
  justOne: false,
});

wineSchema.virtual('tastingNotes', {
  ref: 'TastingNote',
  localField: '_id',
  foreignField: 'wine',
  justOne: false,
});

const Wine = mongoose.model('Wine', wineSchema);
module.exports = Wine;
