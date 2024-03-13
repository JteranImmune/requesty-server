const passport = require('passport');
const LocalStrategy =  require('passport-local').Strategy;
const JwtStrategy =  require ('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User =  require("../models/user.model");
const { validatePass } = require('../utils/auth');

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env.SECRET_KEY,
        },
        async function(jwtPayload, done) {
            try {
                const user = await User.findById(jwtPayload.user);
                if (!user) return done(null, false);

                const newPayLoad = {
                    user: user._id,
                    email: user.email,
                    role: user.role,
                    name: user.name
                };
                return done(null, newPayLoad);
            } catch (err) {
                return  done(err, false);
            }
        }
    )
)


passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async function(email, password, done){
            try {
                let user =  await User.findOne({ email }).select('+password');
                if(!user) {
                    console.log('No user with that email was found') 
                    return done(null, false);
                };
                if(!validatePass(password, user.password.hash, user.password.salt)) {
                    console.log('The password is incorrect')
                    return done(null, false);
                };
                console.log('User login successful!');
                return done(null, user);
            } catch (err) {
                
            }
        } 
    )
);