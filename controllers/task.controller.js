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

const listDashboardTask = async ( _req, res, next ) => {
    try{
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
          };
          
        const tasks = await Task.find().sort({ createdAt: -1 }).populate('owner', 'avatar name email').populate('client', 'name email').lean();

        console.log(tasks);

        const orderedTasks = tasks.map(task => ({
            _id: task._id,
            title: task.title,
            client:  task.client ? task.client.name : 'Unassigned',
            owner: task.owner ? task.owner.avatar.url : 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/05/05ab5b380d37342ce7dd5c8981eb91d2c4b3a75e.jpg',
            status: task.status,
            priority: task.priority || '',
            createdAt: formatDate(task.createdAt) || '',
            dueDate: formatDate(task.dueDate) || '',
            ownerName: task.owner ? task.owner.name : 'No owner',
            email: task.owner ? task.owner.email : 'No Email'
        }));

        res.status(200).json(orderedTasks);
    }catch(err){
        next(err);
    }
};

const getOneTask = async ( req, res, next )=>{
    try {
        const { task_id }  = req.params;
        if (!Types.ObjectId.isValid(task_id)) return res.status(400).json({msg: "Invalid Task ID"});

        const task = await Task.findById(task_id).populate('owner', 'avatar name email').lean();

        if(!task) return res.status(404).json({ msg : "No task with this id." });

        res.status(200).json(task);

    } catch (err) {
        next(err);
    }
}

const createNewTask = async ( req, res, next ) => {
    const {
        title,
        description,
        attachments,
        status,
        priority,
        dueDate,
        service,
        owner,
        client,
    } = req.body;
    try {
        if(!title || !description || !priority || !dueDate  || !service){
            return res.status(400).json({ msg : "Missing fields!" })
        }

        await Task.create({
            title,
            description,
            attachments,
            status: status || "submitted",
            priority,
            dueDate,
            service,
            owner,
            client,
        });
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
};

const editOneTask = async (req,res,next)=> {
    const { task_id } = req.params;
    const { 
        title,
        description,
        attachments,
        status,
        priority,
        dueDate,
        owner, 
    } = req.body;
    try {
        if(!title || !description || !status || !priority || !dueDate){
            return res.status(400).json({ msg : "Missing fields!" })
        }

        if (!Types.ObjectId.isValid(task_id)) {
            return res.status(400).json({ msg: 'Invalid task id!' });
        }

        const task = await Task.findByIdAndUpdate(task_id, 
            {
                title,
                description,
                attachments,
                status,
                priority,
                dueDate,
                owner
            },
            {new:true} 
            ).select('-createdAt -updateAdt');
        
        if(!task) return res.status(404).json({ msg : "Task id not found for update" });

        res.status(200).json(task);
        
    } catch (err) {
        next(err);
    }

};

const deleteOneTask = async (req,res,next)=>{
    const { task_id } = req.params;

    try {

        if (!Types.ObjectId.isValid(task_id)) return res.status(400).json({msg: "Invalid Task ID"});

        const task = await Task.findByIdAndDelete(task_id);

        if(!task) return res.status(404).json({msg:"No task with this ID was found."});

        res.status(200).json({msg:"The task has been deleted successfully."});
        
    } catch (err) {
        next(err);
    }
};

const changeOneTaskStatus = async  (req,res,next) =>{
    
    const { task_id } = req.params;
    const { status } = req.body;

    try {

        if (!Types.ObjectId.isValid(task_id)) return res.status(400).json({msg: "Invalid Task ID"});

        if(!status){
            return res.status(400).json({ msg : "Missing  status field!" })
        }

       const updTask = await Task.findByIdAndUpdate(task_id,{status}, { new: true });

       if(!updTask) return res.status(404).json({msg:'This task does not exist.'})

       res.status(200).json(updTask);

    }catch(err){ 
        next(err);
    }
};

const assignOneTask =  async (req, res, next) => {
    
    const { task_id } = req.params;
    const { owner } = req.body;

    try {

        if (!owner) return res.status(400).json({ msg: 'Missing owner field' });
        else if (!Types.ObjectId.isValid(owner)) return res.status(400).json({ msg: 'Owner ID is invalid!' });
        else if (!Types.ObjectId.isValid(task_id)) return res.status(400).json({ msg: 'Task ID is Invalid!' });
    
        let task = await Task.findById(task_id);
    
        if (!task) return res.status(404).json({ msg: 'The task with given id was not found.' });
       
        task = await task.updateOne({owner: [owner]});
        
        res.send(task);
    } catch (err) {
        next(err);
    }

}

module.exports = {
    listAllTask,
    listDashboardTask,
    getOneTask,
    createNewTask,
    editOneTask,
    deleteOneTask,
    changeOneTaskStatus,
    assignOneTask
};