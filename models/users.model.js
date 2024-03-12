const  { Schema, model, Types } = mongoose;

const UserSchema = new  Schema({

        _id: Types.ObjectId,
        username: { 
            type : String, 
            required : true,
            trim: true 
        },
        password:{
            type :String ,
            required:true,
            trim: true
        },
        email:{
            type:String,
            unique:true,
            match:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
            required:[true, 'Please provide an email'],
            trim: true
        },
        name: {
            firstName: {
                type:String,
                require:'First Name is Required',
                trim: true
            },
            lastName: {
                type:String,
                trim: true
            }
        },
        role: {
            type: String,
            enum: ['Client', 'Admin', 'Team'], // Only allow the values 'User' and 'Admin'.
            default:'Team',
        },
        avatar: {
            url: String,
            filename: String,
            mimetype: String,
            path: String,
            size: Number,
            default: "https://res.cloudinary.com/dqvgwl5s3/image/upload/v1627822680/avatars/default_user_yxjnhk"
        },
        created:{
            type:Date,
            default:  Date.now,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);


module.exports .User = model("User", UserSchema);