const router = require( 'express' ).Router();

const {
    listAllUsers,
    getOneUser,
    createNewUser,
    editOneUser,
    deleteOneUser,
    // assignOneTask,
} = require( '../controllers/auth.controller' );