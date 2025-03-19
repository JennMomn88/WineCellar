const createError = require('http-errors');
const Wine = require('../models/wine.models');
const Rating = require('../models/rating.models');

//Aqui va los comentarios, la puntuacion de cada vino, notas privadas tambien???, notas del catador.... nose que mas.

module.exports.list = (req, res, next) => {
  const {
    limit = 100,
    page = 0,
    sort = 'year',
    name,
    winery,
    type,
  } = req.query;

  if (isNaN(limit) || Number(limit) <= 0) {
    return next(
      createError(400, {
        message: 'Invalid query parameter',
        errors: { limit: 'Must be >= 0' },
      })
    );
  }
  if (isNaN(page) || Number(page) < 0) {
    return next(
      createError(400, {
        message: 'Invalid query parameter',
        errors: { page: 'Must be >= 0' },
      })
    );
  }

  const criteria = {};
  if (name) criteria.name = new RegExp(name, 'i');
  if (winery) criteria.winery = new RegExp(winery, 'i');
  if (type) criteria.winetype = new RegExp(type, 'i');

  Wine.find(criteria)
    .sort({ [sort]: 'desc' })
    .limit(Number(limit))
    .skip(Number(limit) * Number(page))
    .populate('ratings')
    .populate('tastingNotes')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'name avatar',
      },
    })
    .then((wines) => {
      wines = wines.map((wine) => {
        // Si el vino tiene ratings, calculamos el promedio
        if (wine.ratings && wine.ratings.length > 0) {
          const totalScore = wine.ratings.reduce(
            (sum, rating) => sum + rating.score,
            0
          );
          const averageScore = totalScore / wine.ratings.length; // Calcula el promedio
          wine.rating = averageScore; // Añadimos el score global al vino
        } else {
          wine.rating = 0; // Si no hay ratings, el score es 0
        }

        // Eliminamos los detalles de los ratings (solo se manda el score global)
        delete wine.ratings;

        return wine;
      });

      res.json(wines);
    })
    .catch((error) => next(error));
};

/* const criterial = {};
       if (city) criterial['address.city'] = city;
       if (title) criterial.title = new RegExp(title, 'i');
       if (lat && lng) {
       if (Number.isNaN(Number(lat)) || !(Number(lat) >= -90 && Number(lat) <= 90)) {
        return next(createError(400, { message: 'Invalid lat parameter', errors: { lat: 'Must be -90 >= lat <= 90' } }));
      }
       if (Number.isNaN(Number(lng)) || !(Number(lng) >= -180 && Number(lng) <= 180)) {
      return next(createError(400, { message: 'Invalid lat parameter', errors: { lng: 'Must be -180 >= lat <= 180' } }));
      }
      criterial['address.location'] = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [Number(lng), Number(lat)]
       },
      $maxDistance: Number(radius),
      $minDistance: 0
     }
    }
  }*/

module.exports.create = (req, res, next) => {
  // Verificamos que el usuario esté autenticado (esto debería ser manejado previamente con un middleware de autenticación)
  if (!req.user) {
    return next(createError(401, 'Usuario no autenticado'));
  }

  console.log(req.body);
  // Crear el vino, incluyendo el user.id como creador
  console.log(req.file);
  Wine.create({
    name: req.body.name,
    year: req.body.year,
    country: req.body.country,
    city: req.body.city,
    grapeVariety: req.body.grapeVariety,
    winetype: req.body.winetype,
    winery: req.body.winery,
    image: req.files?.image[0].path,
    createdBy: req.user.id,
    label: req.files?.label[0].path, // Si no se pasa, el valor será false
    price: req.body.price, // Si no se pasa, el valor será 8.99
    description: req.body.description,
  })
    .then((wine) => res.status(201).json(wine))
    .catch((error) => next(error));
};

module.exports.details = (req, res, next) => {
  const { id } = req.params;
  Wine.findById(id)
    .populate({
      path: 'ratings',
      populate: [
        {
          path: 'user',
          select: 'name avatar',
        },
      ],
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'name avatar',
      },
    })
    .populate({
      path: 'tastingNotes',
      populate: {
        path: 'user',
        select: 'name avatar',
      },
    })

    .then((wine) => {
      if (!wine) {
        return next(createError(404, 'Wine not found'));
      }
      if (wine.ratings && wine.ratings.length > 0) {
        const totalScore = wine.ratings.reduce(
          (sum, rating) => sum + rating.score,
          0
        );
        const averageScore = totalScore / wine.ratings.length;
        wine.rating = averageScore; // Añadimos el rating global
      } else {
        wine.rating = 0; // Si no hay ratings, el score es 0
      }

      // Eliminamos los detalles de los ratings (solo se manda el score global)
      delete wine.ratings;

      res.status(200).send(wine);
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const permittedParams = ['name', 'year', 'winery', 'winetype'];
  Object.keys(body).forEach((key) => {
    if (!permittedParams.includes(key)) delete body[key];
  });

  Wine.findByIdAndUpdate(id, body, { runValidators: true, new: true })
    .then((wine) => {
      if (!wine) next(createError(404, 'Wine not found'));
      else res.status(201).json(wine);
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  //Esto no tiene mucho sentido que pueda borrar un usuario un vino. Eliminarlo de la su cellar??
  const { id } = req.params;

  Wine.findByIdAndDelete(id)
    .then((wine) => {
      if (!wine) next(createError(404, 'Wine not found'));
      else res.status(204).send();
    })
    .catch((error) => next(error));
};
