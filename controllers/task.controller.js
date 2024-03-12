const { Types } = require('mongoose');
const Task = require( '../models/task.model.js' );

const listAllTask = async ( _req, res, next ) => {
    try{
        const task = await Task.find().sort({createdAt: -1}).lean();
        console.log("Create Task");
        res.status(200).json(task)
        
    }catch(err){
        next(err);
    }
};

module.exports = {listAllTask};

// const getOneTask = async ( req, res, next )=>{
//     try {

//         const { task_id }  = req.params;
//         if (!Types.ObjectId.isValid(task_id)) return res.status(400).json({msg: "Invalid Task ID"});

//         const task = await Task.findById(task_id);

//         if(!task) return res.status(404).json({ msg : "No task with that id." });

//         res.status(200).json(task);

//     } catch (err) {
//         next(err);
//     }
// }