const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../api/models/user');

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


passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});