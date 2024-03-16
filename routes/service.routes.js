const router = require( 'express' ).Router();

const {
    listAllService,
    getOneService,
    createNewService,
    editOneService,
    deleteOneService,
} = require( '../controllers/service.controler' );

router.get('/list', listAllService); // List all services
router.get('/getOne/:service_id', getOneService); // Get one service by id
router.post('/create', createNewService); // Create a new service
router.put('/edit/:service_id', editOneService); // Edit an existing service
router.delete('/delete/:service_id', deleteOneService); // Delete a service

module.exports = router;