const User = require('../models/user.models');
const createError = require('http-errors');

module.exports.loadSessionUser = (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    req.user = undefined;
    next();
  } else {
    User.findById(userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => next(error));
  }
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(createError(401, 'Unauthorized, missing credentials'));
  }
};
