const passport = require('koa-passport')

exports.init = app => {
  // passport initialize добавляет 3 метода
  // 1) isAuthenticated()
  // 2) login()
  // 3) logout()
  app.use(passport.initialize());
  app.use(passport.session()); // ctx.state.user = user
};
