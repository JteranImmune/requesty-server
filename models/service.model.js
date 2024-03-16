const  { Schema, model } = require('mongoose');

const serviceSchema = new Schema({

    name:{
        type: String,
        required: [true,'Please provide a service name'],
        unique: true,
        maxlength: 50,
        trim: true
    },
    description: {
        type: String,
        default: "",
        required: [true,'Please provide a description'],
        maxlength: 200,
        trim: true
    },
    image:{
        url: { 
            type: String, 
            default: "https://i.pravatar.cc/150?u=fake@pravatar.com"
        },
        filename: String,
        mimetype: String,
        path: String,
        size: Number
    },
    price:{
        type: Number,
        required:[true,"Price is required"],
        min: [1,"Value must be above or equal to 1"],  
    }
},
{
    timestamps: true,
    versionKey: false
}
);

const Service = model("Service", serviceSchema);

module.exports= Service;