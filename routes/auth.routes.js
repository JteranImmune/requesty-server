// const express = require( 'express' );
const router = require( 'express' ).Router();
const passport = require( 'passport' );
const { login, signup, verify, fail} = require( '../controllers/auth.controller' ) ;
const userRolMiddleware = require('../middleware/auth.middleware');

router.all('/fail', fail)
router.post('/login', passport.authenticate('login', {session:false, failureRedirect: "api/auth/fail" }), login);
router.post('/signup', signup);
router.post('/verify', [passport.authenticate('jwt', { session:false}), userRolMiddleware], verify);

module.exports = router;