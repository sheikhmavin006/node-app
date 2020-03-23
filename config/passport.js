const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../api/models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

passport.use('local', new LocalStrategy({
  usernameField: 'email', //it can be username which is default ..this fild will be binded to username in function below
  passwordField: 'password'
},
  function (username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.isValid(password)) { // isValid is defined in User schema
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload)
    try {
      User.findOne({ _id: jwt_payload._id }).then(user => {
        if (user) {
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err, false);
    }
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


