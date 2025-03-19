const createError = require('http-errors');
const Rating = require('../models/rating.models');
const Wine = require('../models/wine.models');

// Agregar una puntuación a un vino
module.exports.addRating = (req, res, next) => {
  const { wineId, score } = req.body;
  const userId = req.user.id;

  // Verificar que se proporcionen un ID de vino y una puntuación
  if (!wineId || score === undefined || score === null || isNaN(score)) {
    return next(
      createError(
        400,
        'Debe proporcionar un ID de vino y una puntuación válida.'
      )
    );
  }

  // Validar que la puntuación esté en el rango de 0 a 5
  if (score < 0 || score > 5) {
    return next(createError(400, 'La puntuación debe estar entre 0 y 5.'));
  }

  // Verificar si el usuario ya ha calificado este vino
  Rating.findOne({ wine: wineId, user: userId })
    .then((existingRating) => {
      if (existingRating) {
        return next(createError(400, 'Ya calificaste este vino.'));
      }

      // Crear una nueva puntuación
      return Rating.create({
        wine: wineId,
        score,
        user: userId,
      });
    })
    .then(() => {
      // Recalcular el promedio de puntuaciones del vino
      return Wine.findById(wineId);
    })
    .then((wine) => {
      if (!wine) {
        return next(createError(404, 'Vino no encontrado.'));
      }

      // Llamar al método para calcular el promedio (asumiendo que lo tienes en el modelo Wine)
      return wine.calculateAverageRating();
    })
    .then(() => {
      res.status(201).json({ msg: 'Puntuación agregada correctamente.' });
    })
    .catch(next);
};

// Obtener la puntuación promedio de un vino
module.exports.getWineRating = (req, res, next) => {
  const { wineId } = req.params;

  if (!wineId) {
    return next(createError(400, 'Debe proporcionar un ID de vino.'));
  }

  Rating.find({ wine: wineId })
    .then((ratings) => {
      if (ratings.length === 0) {
        return res.json({ averageScore: 'No hay puntuaciones aún' });
      }

      const totalScore = ratings.reduce((sum, r) => sum + r.score, 0);
      const averageScore = totalScore / ratings.length;

      res.json({ averageScore, totalRatings: ratings.length });
    })
    .catch(next);
};
