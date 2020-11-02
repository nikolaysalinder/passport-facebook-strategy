const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('config');
const User = require('../../../models/User');

module.exports = new FacebookStrategy({
    clientID: config.get('providers.facebook.appId'),
    clientSecret: config.get('providers.facebook.appSecret'),
    callbackURL: `${config.get('server.site.host')}:${config.get('server.site.port')}/oauth/facebook`,
    profileFields: ['displayName', 'email'],
  }, function(accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value;

    User.findOne({email}, (err, user) => {
      if (err) return done(err);

      if (!user) {
        User.create({
          email,
          displayName: profile.displayName,
          providers: [{id: 'facebook', profile}]
        }, (err, user) => {
          if (err) return done(err);
          done(null, user, { message: 'Добро пожаловать!' });
        });
      } else {
        if (user.providers.find(provider => provider.id === 'facebook')) {
          done(null, user, { message: 'Добро пожаловать!' });
        } else {
          user.providers.push({ id: 'facebook', profile });
          user.save(err => {
            if (err) return done(err);

            done(null, user, { message: 'Добро пожаловать!' });
          });
        }
      }
    });
  }
);
