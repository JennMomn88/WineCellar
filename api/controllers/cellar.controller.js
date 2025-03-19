const createError = require('http-errors');
const Cellar = require('../models/cellar.models');
const Wine = require('../models/wine.models');
const User = require('../models/user.models.js');

//creamos cellar pero comprobamos que el usuario no tenga alguna ya creada.
module.exports.create = (req, res, next) => {
  if (!req.user) {
    return next(createError(401, 'Usuario desconocido'));
  }

  Cellar.findOne({ owner: req.user.id })
    .then((existingCellar) => {
      if (existingCellar) {
        return next(createError(400, 'El usuario ya tiene una bodega.'));
      }

      return Cellar.create({ ...req.body, owner: req.user.id });
    })
    .then((cellar) => res.status(201).json(cellar))
    .catch(next);
};
//obtenemos los detalles de la bodega del usuario authenticado
module.exports.detail = (req, res, next) => {
  Cellar.findOne({ owner: req.user.id })
    //.populate('wine')
    .then((cellar) => {
      if (!cellar) {
        return next(createError(404, 'Bodega no encontrada'));
      }
      cellar
        .populate('wines')
        .then((c) => c.populate('owner'))
        .then((populatedCellar) => res.json(populatedCellar));
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const { body } = req;
  const permittedParams = ['name', 'title', 'description'];

  Object.keys(body).forEach((key) => {
    if (!permittedParams.includes(key)) delete body[key];
  });

  Cellar.findOneAndUpdate({ owner: req.user.id }, body, {
    new: true,
    runValidators: true,
  })
    .then((cellar) => {
      if (!cellar) return next(createError(404, 'Bodega no encontrada'));
      res.status(200).json(cellar);
    })

    .catch(next);
};

module.exports.delete = (req, res, next) => {
  //se elimina el cellar completo.

  Cellar.findOneAndDelete({ owner: req.user.id })
    .then((cellar) => {
      if (!cellar) return next(createError(404, 'Bodega no encontrada'));
      res.status(200).json({ msg: 'Cellar eliminado', cellar });
    })

    .catch(next);
};

// agregamos un vino a nuestro cellar.
module.exports.addWineToCellar = (req, res, next) => {
  const { wineId } = req.body;
  const userId = req.user.id;

  if (!wineId) {
    return next(createError(400, 'No ahi vino para introducir'));
  }

  Cellar.findOne({ owner: userId })
    .then((cellar) => {
      if (!cellar) {
        cellar = new Cellar({ owner: userId, wines: [] });
      }

      if (!cellar.wines.includes(wineId)) {
        cellar.wines.push(wineId);
        return cellar.save().then((updatedCellar) => {
          updatedCellar.populate('wines').then((populateCellar) => {
            //en la llamada podemos ver los vinos en los cellar.
            res.json({
              msg: 'Vino agregado al cellar',
              cellar: populateCellar,
            });
          });
        });
      } else {
        return next(createError(400, 'El vino ya está en tu cellar'));
      }
    })
    .catch(next);
};

module.exports.removedWine = (req, res, next) => {
  const { wineId } = req.params;
  const { reason } = req.body;
  const userId = req.user.id;

  if (!['Regalado', 'Consumido', 'Roto', 'Otro'].includes(reason)) {
    return next(createError(400, 'Selecciona un motivo'));
  }
  Cellar.findOne({ owner: userId })
    .then((cellar) => {
      if (!cellar)
        return next(createError(400, 'No se ha encontrado el cellar.'));
      const wineIndex = cellar.wines.indexOf(wineId);

      if (wineIndex === -1) {
        //busca el vino
        return next(createError(400, 'El vino no está en tu cellar.'));
      }

      cellar.wines.splice(wineIndex, 1);
      //cellar.removedWines.push({ wine: wineId, reason });  // pone los vinos eliminados en un array con la razon numca implementado

      return cellar.save();
    })
    .then((updatedCellar) =>
      res.json({ msg: 'Vino eliminado del cellar', cellar: updatedCellar })
    )
    .catch((error) => next(error));
};
