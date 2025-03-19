const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const createError = require('http-errors');
const users = require('../controllers/users.controllers');
const sessions = require('../controllers/sessions.controller');
const auth = require('../middlewares/sessions.middlewares'); //middleware de session falta anadir a los vinos, parte sin crear aun.
const wines = require('../controllers/wines.controller');
const cellar = require('../controllers/cellar.controller');
const comment = require('../controllers/comment.controller');
const storage = require('../config/storage.config');
const follow = require('../controllers/follow.controller');
const rating = require('../controllers/rating.controller');
const tastingNote = require('../controllers/tastingNote.controller');

//Users Routes
router.post('/users', storage.single('avatar'), users.create); //funciona
router.patch(
  '/users/me',
  auth.isAuthenticated,
  storage.single('avatar'),
  users.update
); // funciona
router.get('/users/me', auth.isAuthenticated, users.profile); // funciona

//Session Routes
router.post('/sessions', sessions.create); //Funciona
router.delete('/sessions', auth.isAuthenticated, sessions.destroy); //Funciona

//wines routes
router.post(
  '/wines',
  auth.isAuthenticated,
  storage.fields([
    { name: 'label', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  wines.create
); //Funciona
router.get('/wines/:id', auth.isAuthenticated, wines.details); //Funciona
router.get('/wines', auth.isAuthenticated, wines.list); //Funciona
router.delete('/wines/:id', auth.isAuthenticated, wines.delete); //Funciona

//coments wine routes
router.get('/comments', auth.isAuthenticated, comment.fullList);
router.post('/comments', auth.isAuthenticated, comment.create); //Funciona crear comentario al vino
router.patch('/comments/:commentId', auth.isAuthenticated, comment.update); //FUNCIONA
router.delete('/comments/:commentId', auth.isAuthenticated, comment.delete); //FUNCIONA

//cellar routes
router.post('/cellar', auth.isAuthenticated, cellar.create); //crea un cellar nuevo FUNCIONA
router.get('/cellar/me', auth.isAuthenticated, cellar.detail); //Nos devuelve el cellar tenga vinos o no., FUNCIONA
router.patch('/cellar/:idCellar', auth.isAuthenticated, cellar.update); // editamos caracteristicas del cellar. FUNCIONA
router.post(
  //anade un vino a nuestro cellar. FUNCIONA
  '/cellar/wine',
  auth.isAuthenticated,
  cellar.addWineToCellar
);
router.patch(
  //Elimina un vino de nuestro cellar. FUNCIONA
  '/cellar/wine/:wineId',
  auth.isAuthenticated,
  cellar.removedWine
);
router.delete(
  //elimna el cellar completo. FUNCIONA
  '/cellar/delete',
  auth.isAuthenticated,
  cellar.delete
);
//follow Rutas
router.post('/follow', auth.isAuthenticated, follow.followUser); // Seguir a un usuario //FUNCIONA
router.post('/unfollow', auth.isAuthenticated, follow.unfollowUser); // Dejar de seguir a un usuario // FUNCIONA
router.get(
  '/following/cellar',
  auth.isAuthenticated,
  follow.getFollowingCellars
); // Ver los cellars de los usuarios seguidos // Volver a probar
router.get('/followers/:userId?', auth.isAuthenticated, follow.getFollowers); // Ver seguidores de un usuario //FUNCIONA
router.get('/following/:userId?', auth.isAuthenticated, follow.getFollowing); // Ver a quién sigue un usuario // FUNCIONA

//rating rutas.
router.post('/rating', auth.isAuthenticated, rating.addRating); // Agregar puntuación a un vino //FUNCIONA
router.get('/rating/:wineId', auth.isAuthenticated, rating.getWineRating); // Obtener puntuación promedio de un vino //FUNCIONA

//TastingNote rutas
router.post('/tasting', auth.isAuthenticated, tastingNote.addTastingNote); // Agregar una nota de cata a un vino
router.get(
  '/tasting/:wineId',
  auth.isAuthenticated,
  tastingNote.getTastingNotes
); // Obtener las notas de cata de un vino
router.get(
  '/tasting/:wineId/summary',
  auth.isAuthenticated,
  tastingNote.getTastingSummary
); // Obtener el resumen de notas de cata de un vino (sumando todas las notas)

router.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

router.use((error, req, res, next) => {
  console.error(error);
  if (
    error instanceof mongoose.Error.CastError &&
    error.message.includes('_id')
  )
    error = createError(404, 'Resource not found');
  else if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error);
  } else if (!error.status) error = createError(500, error.message);

  const data = {};
  data.message = error.message;
  if (error.errors) {
    data.errors = Object.keys(error.errors).reduce((errors, errorKey) => {
      errors[errorKey] =
        error.errors[errorKey]?.message || error.errors[errorKey];
      return errors;
    }, {});
  }
  res.status(error.status).json(data);
});

module.exports = router;
