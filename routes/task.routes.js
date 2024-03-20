const router = require( 'express' ).Router();
const passport = require( 'passport' );
const userRolMiddleware = require('../middleware/auth.middleware');

const {
    listAllTask,
    getOneTask,
    createNewTask,
    editOneTask,
    deleteOneTask,
    changeOneTaskStatus,
    assignOneTask,
} = require( '../controllers/task.controller' );

router.get('/list', listAllTask); // List all tasks
router.get('/getOne/:task_id', getOneTask); // Get one task by id
router.post('/create', [passport.authenticate("jwt", { session: false }), userRolMiddleware(["Admin", "Client"])], createNewTask); // Create a new task
router.put('/edit/:task_id', editOneTask); // Edit an existing task
router.delete('/delete/:task_id', deleteOneTask); // Delete a task
router.patch('/status/:task_id', changeOneTaskStatus)  // Assign user to a task
router.patch('/assign/:task_id', assignOneTask)  // Assign user to a task

module.exports = router;