const  { Schema, model, Types } = mongoose;

const TaskSchema = new Schema({

        _id: Types.ObjectId,   
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
        assignedTo: {
            type: Types.ObjectId,
            ref: "User"
        },
        owner: {
            type: Types.ObjectId,
            ref: "User",
            required: [true,"A Task must belong to someone"]
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports .Task = model("Task", TaskSchema);