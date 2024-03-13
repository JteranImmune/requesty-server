const  { Schema, model } = require('mongoose');

const UserSchema = new  Schema({

        username: { 
            type : String, 
            required : true,
            trim: true 
        },
        password:{
            type :String ,
            required:true,
            trim: true,
            // validate(value){
            //     if (value.length <8 ) {
            //         throw new Error("Password should be at least 6 characters");
            //     } else if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
            //         throw new Error("Password should contain at least one lowercase letter, one uppercase letter, and one number");
            //     }
            // }
        },
        email:{
            type:String,
            unique:true,
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
        name: {
            type:String,
            require:[true,'Please add a name'],
            trim: true,
            maxlength: 20,
        },
        role: {
            type: String,
            enum: ['Admin', 'Team'],
            default:'Admin',
        },
        avatar: {
            url: String,
            filename: String,
            mimetype: String,
            path: String,
            size: Number,
            default: "https://res.cloudinary.com/dqvgwl5s3/image/upload/v1627822680/avatars/default_user_yxjnhk"
        },
        createdAt:{
            type:Date,
            default: Date.now()
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const User = model('User', UserSchema)

module.exports = User;