# passport-facebook-strategy
Simple app with passport-facebook-strategy.
Created using koa, koa-passport, mongoose, MongoDB.

# Dont' forget add config folder with defult.js file:

```const path = require('path');

module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  secret: 'mysecret',
  root: process.cwd(),
  templatesRoot: path.join(process.cwd(), 'templates'),
  crypto: {
    hash: {
      length: 128,
      iterations: 10
    }
  },
  mongodb: {
    debug: true,
    uri: 'mongodb://localhost/passport_facebook'
  },
  server: {
    site: {
      host: 'http://localhost',
      port: 3000,
    }
  },
  providers: {
    facebook: {
      appId: 'Facebook appId from facebook',
      appSecret: 'Facebook appSecret from facebook',
      passportOptions: {
        scope: ['email']
      }
    },
    vkontakte: {
      appId: 'Vk appId from vk',
      appSecret: 'Vk appSecret from vk',
      passportOptions: {
        scope: ['email']
      }
    }
  },
};

```