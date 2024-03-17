const router = require('express').Router();
const TaskRoutes = require( './task.routes.js' );
const authRoutes = require( './auth.routes.js' );
const ServiceRoutes = require('./service.routes.js')
const uploadRoutes = require('./upload.routes.js');

router.use( '/tasks', TaskRoutes);
router.use('/auth', authRoutes);
router.use('/service', ServiceRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;