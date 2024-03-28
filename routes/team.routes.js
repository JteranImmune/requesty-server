const router = require( 'express' ).Router();
const passport = require( 'passport' );
const {userRolMiddleware} = require('../middlewares/auth.middleware');
const authenticationAdmin = [passport.authenticate("jwt", { session: false }), userRolMiddleware(["Admin"])];

const {
    listAllTeamUsers,
    getOneTeamUser,
    // createNewTeamUser,
    editOneTeamUser,
    deleteOneTeamUser,
} = require( '../controllers/team.controller' );

router.get('/all',authenticationAdmin, listAllTeamUsers); // List all Team user
router.get('/user/:user_id/',authenticationAdmin, getOneTeamUser); // List all Team user
// router.post('/create', authenticationAdmin, createNewTeamUser); // Create a new Team user
router.put('/edit/:user_id',authenticationAdmin, editOneTeamUser); // Edit an existing Team user
router.delete('/delete/:user_id',authenticationAdmin, deleteOneTeamUser); // Delete a Team user


module.exports = router;