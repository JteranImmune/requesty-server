const router = require('express').Router();
const TaskRoutes = require( './task.routes.js' );
// const  authRoutes = require( './auth.routes.js' );

router.use( '/tasks', TaskRoutes);
// router.use('/auth', authRoutes);

module.exports = router;