const router = require( 'express' ).Router();
const passport = require( 'passport' );
const {userRolMiddleware} = require('../middlewares/auth.middleware');
const authenticationAdmin = [passport.authenticate("jwt", { session: false }), userRolMiddleware(["Admin"])];
const authenticationUsers = [passport.authenticate("jwt", { session: false }), userRolMiddleware(["Admin", "Client"])];

const {
    listAllService,
    getOneService,
    createNewService,
    editOneService,
    deleteOneService,
} = require( '../controllers/service.controler' );

router.get('/list', listAllService); // List all services
router.get('/getOne/:service_id', authenticationUsers, getOneService); // Get one service by id
router.post('/create', authenticationAdmin , createNewService); // Create a new service
router.put('/edit/:service_id',authenticationAdmin, editOneService); // Edit an existing service
router.delete('/delete/:service_id',authenticationAdmin, deleteOneService); // Delete a service

module.exports = router;