const VKStrategy = require('passport-vkontakte').Strategy;
const config = require('config');
const User = require('../../../models/User');

module.exports = new VKStrategy({
    clientID: config.get('providers.vkontakte.appId'),
    clientSecret: config.get('providers.vkontakte.appSecret'),
    callbackURL: `${config.get('server.site.host')}:${config.get('server.site.port')}/oauth/vkontakte`,
    scope: ['email'],
    profileFields: ['email'],
  }, function(accessToken, refreshToken, params, profile, done) {
    const email = params.email;

    User.findOne({email}, (err, user) => {
      if (err) return done(err);

      if (!user) {
        User.create({
          email,
          displayName: profile.displayName,
          providers: [{id: 'vkontakte', profile}]
        }, (err, user) => {
          if (err) return done(err);
          done(null, user, { message: 'Добро пожаловать!' });
        });
      } else {
        if (user.providers.find(provider => provider.id === 'vkontakte')) {
          done(null, user, { message: 'Добро пожаловать!' });
        } else {
          user.providers.push({ id: 'vkontakte', profile });
          user.save(err => {
            if (err) return done(err);

            done(null, user, { message: 'Добро пожаловать!' });
          });
        }
      }
    });
  }
);
