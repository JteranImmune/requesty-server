const { Types } = require('mongoose');
const Task = require( '../models/task.model.js' );

const listAllTask = async ( _req, res, next ) => {
    try{
        const task = await Task.find().sort({createdAt: -1}).lean();
        console.log("List Task");
        res.status(200).json(task)
        
    }catch(err){
        next(err);
    }
};

const getOneTask = async ( req, res, next )=>{
    try {
        const { task_id }  = req.params;
        if (!Types.ObjectId.isValid(task_id)) return res.status(400).json({msg: "Invalid Task ID"});

        const task = await Task.findById(task_id);

        if(!task) return res.status(404).json({ msg : "No task with that id." });

        res.status(200).json(task);

    } catch (err) {
        next(err);
    }
}

const  createNewTask = async ( req, res, next ) => {
    const {
        _id,
        title,
        description,
        attachments,
        status,
        priority,
        dueDate,
        // assignedTo,
        // owner,
    } = req.body;
    try {
        if(!title || !description || !status || !priority || !dueDate){
            return res.status(400).json({ msg : "Missing fields!" })
        }

        await Task.create({
            _id,
            title,
            description,
            attachments,
            status,
            priority,
            dueDate
        });
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listAllTask,
    getOneTask,
    createNewTask
};