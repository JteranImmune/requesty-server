const router = require( 'express' ).Router();
const passport = require( 'passport' );
const {userRolMiddleware} = require('../middlewares/auth.middleware');
const authenticationAdmin = [passport.authenticate("jwt", { session: false }), userRolMiddleware(["Admin"])];

const {
    listAllClientUsers,
    getOneClientUser,
    // createNewClientUser,
    editOneClientUser,
    deleteOneClientUser,
} = require( '../controllers/client.controler' );

router.get('/all', listAllClientUsers); // List all Client user
router.get('/user/:user_id/', getOneClientUser); // List one Client user
// router.post('/create', authenticationAdmin, creatClientTeamUser); // Create a new Client user
router.put('/edit/:user_id',authenticationAdmin, editOneClientUser); // Edit an existing Client user
router.delete('/delete/:user_id',authenticationAdmin, deleteOneClientUser); // Delete a Client user


module.exports = router;