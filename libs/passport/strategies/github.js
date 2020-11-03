const githubStrategy = require('passport-github2').Strategy;
const config = require('config');
const User = require('../../../models/User');

module.exports = new githubStrategy({
    clientID: config.get('providers.github.appId'),
    clientSecret: config.get('providers.github.appSecret'),
    callbackURL: `${config.get('server.site.host')}:${config.get('server.site.port')}/oauth/github`,
    scope: ['email'],
    profileFields: ['email'],
  }, function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    const email = profile._json.email;

    User.findOne({email}, (err, user) => {
      if (err) return done(err);

      if (!user) {
        User.create({
          email,
          displayName: profile.displayName,
          providers: [{id: 'github', profile}]
        }, (err, user) => {
          if (err) return done(err);
          done(null, user, { message: 'Добро пожаловать!' });
        });
      } else {
        if (user.providers.find(provider => provider.id === 'github')) {
          done(null, user, { message: 'Добро пожаловать!' });
        } else {
          user.providers.push({ id: 'github', profile });
          user.save(err => {
            if (err) return done(err);

            done(null, user, { message: 'Добро пожаловать!' });
          });
        }
      }
    });
  }
);
