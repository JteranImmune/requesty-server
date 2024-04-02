const  { Schema, model } = require('mongoose');

const taskSchema = new Schema({

        title:{
            type: String,
            required: [true,'Please provide a task title'],
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
            enum: ['submitted','in progress', 'completed', 'on hold'],
            default: "submitted",
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
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        client: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        service:{
            type: Schema.Types.ObjectId,
            ref: "Service",
            required: [true,"A service must be assign to the task"]
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Task = model("Task", taskSchema);

module.exports= Task;
