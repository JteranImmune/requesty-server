const  { Schema, model } = require('mongoose');

const userSchema = new  Schema({

        email:{
            type: String,
            unique: true,
            minLength: 1,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                'Choose a valid email',
            ],
            required:[true, 'Please provide an email'],
            trim: true,
            maxlength: 50,
        },
        password:{
            salt:{ type: String, required: true},
            hash:{ type: String, required:true},
            // validate(value){
            //     if (value.length <8 ) {
            //         throw new Error("Password should be at least 6 characters");
            //     } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
            //         throw new Error("Password should contain at least one lowercase letter, one uppercase letter, and one number");
            //     }
            // }
        },
        name: {
            type: String,
            require:[true,'Please add a name'],
            trim: true,
            maxlength: 20,
        },
        role: {
            type: String,
            enum: ['Admin', 'Team', 'Client'],
            default:'Admin',
        },
        avatar: {
            url: { 
                type: String, 
                default: "https://i.pravatar.cc/150?u=fake@pravatar.com"
            },
            filename: String,
            mimetype: String,
            path: String,
            size: Number
        },
        createdAt:{
            type:Date,
            default: Date.now()
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON:{
            virtuals: true,
            transform: function(doc, ret) {
                delete ret.password;
                return ret;
            },
        },
    }   
);

const User = model('User', userSchema)

module.exports = User;