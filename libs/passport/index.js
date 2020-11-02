const passport = require('koa-passport');
const User = require('../../models/User');

const localStrategy = require('./strategies/local');
const facebookStrategy = require('./strategies/facebook');
const vkontakteStrategy = require('./strategies/vkontakte');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, done);
});

passport.use(localStrategy);
passport.use(facebookStrategy);
passport.use(vkontakteStrategy);

module.exports = passport;
