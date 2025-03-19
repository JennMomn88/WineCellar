const createError = require('http-errors');
const Follow = require('../models/follow.models');
const Cellar = require('../models/cellar.models');

// Seguir a otro usuario
module.exports.followUser = (req, res, next) => {
  const { userIdToFollow } = req.body;
  const userId = req.user.id;

  if (userId === userIdToFollow) {
    return next(createError(400, 'No puedes seguirte a ti mismo'));
  }

  Follow.findOne({ follower: userId, following: userIdToFollow })
    .then((existingFollow) => {
      if (existingFollow) {
        return next(createError(400, 'Ya sigues a este usuario'));
      }

      return Follow.create({ follower: userId, following: userIdToFollow });
    })
    .then((newFollow) =>
      res.json({ msg: 'Ahora sigues a este usuario', newFollow })
    )
    .catch(next);
};

// Dejar de seguir a un usuario
module.exports.unfollowUser = (req, res, next) => {
  const { userIdToUnfollow } = req.body;
  const userId = req.user.id;

  Follow.findOneAndDelete({ follower: userId, following: userIdToUnfollow })
    .then((deletedFollow) => {
      if (!deletedFollow) {
        return next(createError(400, 'No sigues a este usuario'));
      }

      res.json({ msg: 'Has dejado de seguir a este usuario' });
    })
    .catch(next);
};

// Obtener los cellars de los usuarios que sigo
module.exports.getFollowingCellars = (req, res, next) => {
  const userId = req.user.id;

  Follow.find({ follower: userId })
    .populate('following')
    .then((follows) => {
      if (follows.length === 0) {
        return next(createError(404, 'No sigues a ningún usuario'));
      }

      const cellarPromises = follows.map((follow) => {
        return Cellar.findOne({ owner: follow.following._id })
          .populate('wines')
          .then((cellar) => ({ owner: follow.following, cellar }));
      });

      return Promise.all(cellarPromises);
    })
    .then((cellars) => res.json(cellars))
    .catch(next);
};

// Obtener la lista de seguidores de un usuario
module.exports.getFollowers = (req, res, next) => {
  const userId = req.params.userId || req.user.id; // Puede ser el usuario autenticado o uno específico

  Follow.find({ following: userId })
    .populate('follower', 'name') // Solo traemos nombre y email del seguidor
    .then((followers) => {
      if (followers.length === 0) {
        return next(createError(404, 'Este usuario no tiene seguidores'));
      }

      res.json(followers.map((f) => f.follower));
    })
    .catch(next);
};

// Obtener la lista de usuarios a los que sigue un usuario
module.exports.getFollowing = (req, res, next) => {
  const userId = req.params.userId || req.user.id;

  Follow.find({ follower: userId })
    .populate('following', 'name email') // Solo traemos nombre y email de los seguidos
    .then((following) => {
      if (following.length === 0) {
        return next(createError(404, 'Este usuario no sigue a nadie'));
      }

      res.json(following.map((f) => f.following));
    })
    .catch(next);
};
