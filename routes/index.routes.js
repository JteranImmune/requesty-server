const router = require('express').Router();
const TaskRoutes = require( './task.routes.js' );
const authRoutes = require( './auth.routes.js' );
const ServiceRoutes = require('./service.routes.js')
const uploadRoutes = require('./upload.routes.js');
const TeamRoutes = require('./team.routes.js')
const ClientRoutes = require('./client.routes.js')

router.use( '/tasks', TaskRoutes);
router.use( '/team', TeamRoutes);
router.use( '/clients', ClientRoutes);
router.use('/auth', authRoutes);
router.use('/service', ServiceRoutes);
router.use('/', uploadRoutes);

module.exports = router;