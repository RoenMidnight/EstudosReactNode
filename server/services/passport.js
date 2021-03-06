const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(() => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then((existingUser) => {
                    if(existingUser){
                        done(null, existingUser);
                    }else {
                        new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                    }
                });

            new User({ googleId: profile.id }).save();
        }
    )
);