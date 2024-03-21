// const express = require( 'express' );
const router = require( 'express' ).Router();
const passport = require( 'passport' );
const { login, signup, verify, fail} = require( '../controllers/auth.controller' );
// const {userMiddleware} = require('../middlewares/auth.middleware');

router.all('/fail', fail)
router.post('/login', passport.authenticate('login', {session:false, failureRedirect: "api/auth/fail" }), login);
router.post('/signup', signup);
router.post('/verify', passport.authenticate("jwt", { session: false }), verify);

module.exports = router;