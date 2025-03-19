const createError = require('http-errors');
const TastingNote = require('../models/tastingNote.models');
const Wine = require('../models/wine.models');

// Agregar una nota de cata a un vino
module.exports.addTastingNote = (req, res, next) => {
  const { wineId, notes } = req.body;
  const userId = req.user.id;

  if (!wineId || !notes || !Array.isArray(notes) || notes.length === 0) {
    return next(
      createError(
        400,
        'Debe proporcionar un ID de vino y al menos una nota válida.'
      )
    );
  }

  // Validar que las notas proporcionadas sean parte de las notas predefinidas
  const invalidNotes = notes.filter(
    (note) =>
      ![
        'Frutal',
        'Terroso',
        'Floral',
        'Especiado',
        'Caramelo',
        'Vegetal',
      ].includes(note)
  );
  if (invalidNotes.length > 0) {
    return next(
      createError(
        400,
        `Las siguientes notas no son válidas: ${invalidNotes.join(', ')}`
      )
    );
  }

  Wine.findById(wineId)
    .then((wine) => {
      if (!wine) return next(createError(404, 'Vino no encontrado'));

      // Crear la nueva nota de cata solo con las notas proporcionadas
      const newTastingNote = new TastingNote({
        wine: wineId,
        user: userId,
        notes: notes.map((note) => ({ description: note })),
      });

      return newTastingNote.save();
    })
    .then((savedTastingNote) =>
      res
        .status(201)
        .json({ msg: 'Nota de cata agregada', tasting: savedTastingNote })
    )
    .catch(next);
};

// Obtener las notas de cata de un vino
module.exports.getTastingNotes = (req, res, next) => {
  const { wineId } = req.params;

  if (!wineId) {
    return next(createError(400, 'Debe proporcionar un ID de vino.'));
  }

  TastingNote.findOne({ wine: wineId })
    .populate('user', 'name') // Muestra el nombre del usuario que hizo la nota
    .then((tastingNotes) => {
      if (!tastingNotes || tastingNotes.notes.length === 0) {
        return next(createError(404, 'No hay notas de cata para este vino.'));
      }

      res.json(tastingNotes);
    })
    .catch(next);
};

// Obtener el resumen de notas de cata (sumando todas las notas)
module.exports.getTastingSummary = (req, res, next) => {
  const { wineId } = req.params;

  if (!wineId) {
    return next(createError(400, 'Debe proporcionar un ID de vino.'));
  }

  TastingNote.findOne({ wine: wineId })
    .then((tastingNote) => {
      if (!tastingNote || tastingNote.notes.length === 0) {
        return res.json({ summary: 'No hay notas de cata aún' });
      }

      // Resumir las descripciones de las notas
      const summary = tastingNote.notes.reduce((acc, note) => {
        acc[note.description] = (acc[note.description] || 0) + 1;
        return acc;
      }, {});

      res.json({ summary });
    })
    .catch(next);
};
