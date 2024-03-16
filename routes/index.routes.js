const router = require('express').Router();
const TaskRoutes = require( './task.routes.js' );
const authRoutes = require( './auth.routes.js' );
const ServiceRoutes = require('./service.routes.js')

router.use( '/tasks', TaskRoutes);
router.use('/auth', authRoutes);
router.use('/service', ServiceRoutes);

module.exports = router;