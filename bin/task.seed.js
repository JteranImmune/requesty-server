const Task = require('../models/task.model');
const task = require('./task.json');
// const user = require('./users.json');

(async () => {
    const mongoose = require( 'mongoose' );

    const MONGO_URI = 
        process.env.MONGODB_URI || "mongodb://localhost:27017/Task_App";

    mongoose
        .connect(MONGO_URI)
        .then((x) =>{
            const dbName = x.connection[0].name;
            console.log(`Connected to database "${dbName}"`);
        })
        .catch((err)=>console.error("Error connecting to the database", err));

    try {
        await Task.deleteMany();
        console.log("DB cleaned");

        const modelAdaptedTask = task.map(
            ({
                title,
                description,
                attachments,
                status,
                priority,
                createdAt,
                dueDate,
                // assignedTo,
                // owner,
            }) => {
                return{
                    title,
                    description,
                    attachment: attachments ? attachments.split(',') : [],
                    status,
                    priority,
                    createdAt: new Date(createdAt),
                    dueDate: new Date(dueDate),
                    // assignedTo: assignedTo && user.id(assignedTo),
                    // owner: user.id(owner)
                };
            }
        );

        const taskDb = await  Task.insertMany(modelAdaptedTask);
        console.log('Tasks added to DB',taskDb);

    } catch (error) {
        console.error('Error adding tasks to DB', error);
    } finally{
       mongoose.connection.close();
    }    

})();

