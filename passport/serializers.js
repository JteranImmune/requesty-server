const passport  = require('passport');
const User = require( '../models/user.model' );

passport.serializeUser((loggedInUser, done) =>{
    done(null, loggedInUser._id)
});

passport.deserializeUser((userIdFromSession, done)=>{
    User.findById(userIdFromSession)
    .then( (userDocument) => {
        done( null, userDocument );
    })
    .catch( err => {
        console.log("Error in deserializing the user: ", err);
        done(err);
    })
});