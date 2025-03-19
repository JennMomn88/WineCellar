const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const sessionMaxDays = Number(process.env.SESSION_MAX_DAYS);

module.exports.loadSession = expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === 'true',
    maxAge: sessionMaxDays * 24 * 60 * 60 * 1000,
  },

  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: sessionMaxDays * 24 * 60 * 60,
  }),
});
