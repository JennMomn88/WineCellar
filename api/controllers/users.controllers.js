const createError = require('http-errors');
const User = require('../models/user.models');
const { sendValidationEmail } = require('../config/mailer.config');
const Cellar = require('../models/cellar.models');

module.exports.create = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(
          createError(400, {
            message: 'User email already exists',
            errors: { email: 'Already exists' },
          })
        );
      } else {
        User.create({
          //solo permitimos estos parametros en el body.
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          avatar: req.file?.path,
        }).then((newUser) => {
          Cellar.create({
            name: `${newUser.name}'s cellar`,
            description: 'Default user cellar',
            owner: newUser._id,
            title: `${newUser.name}'s cellar`,
          }).then((newCellar) => {
            req.session.userId = newUser.id;
            res.json(newUser);
          });
        });
      }
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Debes ingresar un campo valido' });
  }

  const permittedBody = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    avatar: req.file?.path,
  };

  //elimina llames que son indefinidas
  Object.keys(permittedBody).forEach((key) => {
    if (permittedBody[key] === undefined) {
      delete permittedBody[key];
    }
  });

  Object.assign(req.user, permittedBody); //mergeamos el body into req.user para guardarlo

  req.user
    .save()
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.profile = (req, res, next) => {
  res.json(req.user);
};
