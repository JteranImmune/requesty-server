const  { Schema, model } = require('mongoose');

const TaskSchema = new Schema({

        title:{
            type: String,
            required: [true,'Please provide a task name'],
            unique: true,
            maxlength: 100,
            trim: true
        },
        description: {
            type: String,
            default: "",
            required: [true,'Please provide a description'],
            maxlength: 500,
            trim: true
        },
        attachments:{
            type:[String],
            default: [],
        },    
        status: {
            type: String,
            enum: ['submitted','in progress', 'completed', 'on hold']
        },
        priority: {
            type: String,
            enum: ['Low','Medium', 'High']
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        dueDate: {
            type: Date
        },
        // assignedTo: {
        //     type: Schema.Types.ObjectId,
        //     ref: "User"
        // },
        // owner: {
        //     type: Schema.Types.ObjectId,
        //     ref: "User",
        //     required: [true,"A Task must belong to someone"]
        // },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Task = model("Task", TaskSchema);

module.exports= Task;
