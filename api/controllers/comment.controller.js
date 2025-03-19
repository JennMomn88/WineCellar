const createError = require('http-errors');
const Comment = require('../models/comment.models');
const Wine = require('../models/wine.models');
const User = require('../models/user.models');

module.exports.fullList = (req, res, next) => {
  const { limit = 6, page = 0, sort = 'year', name, winery, user } = req.query;

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
  if (name) criteria.wine.name = new RegExp(name, 'i');
  if (winery) criteria.wine.winery = new RegExp(winery, 'i');
  if (user) criteria.user = user;

  criteria.user = Comment.find(criteria)
    .sort({ [sort]: 'desc' })
    .limit(Number(limit))
    .skip(Number(limit) * Number(page))
    .populate('user')
    .populate('wine')
    .populate('parentComment')
    .then((wines) => {
      res.json(wines);
    })
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  const { wineId, text, isPublic, parentCommentId } = req.body;

  if (!wineId || !text) {
    return next(createError(400, 'Texto y WineId es requerido'));
  }

  Wine.findById(wineId)
    .then((wine) => {
      if (!wine) {
        return next(createError(404, 'Vino no encontrado'));
      }

      if (parentCommentId) {
        return Comment.findById(parentCommentId).then((parentComment) => {
          if (!parentComment) {
            return next(createError(404, 'Comentario no encontrado'));
          }

          return Comment.create({
            wine: parentComment.wine.id,
            user: req.user.id,
            text,
            isPublic,
            parentComment: parentComment.id,
          });
        });
      } else {
        return Comment.create({
          wine: wine.id,
          user: req.user.id,
          text,
          isPublic,
          parentComment: null,
        });
      }
    })
    .then((comment) => res.status(201).json(comment))
    .catch(next);
};

module.exports.list = (req, res, next) => {
  const { wineId } = req.params;

  Wine.findById(wineId)
    .populate({
      path: 'comments',
      populate: { path: 'user', select: 'name' }, //
    })
    .then((wine) => {
      if (!wine) return next(createError(404, 'vino no encontrado'));
      res.json(wine.comments);
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Comment.findOneAndDelete({ _id: req.params.commentId, user: req.user.id })
    .then((comment) => {
      if (!comment)
        return next(
          createError(403, 'Solo puede borrar sus propios comentarios')
        );
      res.status(204).send();
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const { text, isPublic } = req.body;

  Comment.findOneAndUpdate(
    { _id: req.params.commentId, user: req.user.id },
    { text, isPublic },
    { new: true, runValidators: true }
  )
    .then((comment) => {
      if (!comment)
        return next(
          createError(403, 'Solo puede editar sus propios comentarios')
        );
      res.json(comment);
    })
    .catch(next);
};
