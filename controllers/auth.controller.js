const User = require( '../models/user.model.js' );
const { createPass } = require('../utils/auth');
const jwt = require("jsonwebtoken");

const signup = async  (req, res, next) => {
    try {
        let user = await User.findOne({email: req.body.email});

        if(user) res.status(400).json({error:true, message:"User already exist"});

        const passwordCrypt = createPass(req.body.password);

        const result = await  User.create({
            name: req.body.name,
            email: req.body.email, 
            password : passwordCrypt,
            avatar: req.body.avatar || undefined,
            role: req.body.role || "Admin",
        });
        res.json({ error: false , data:result })
        
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const login = async (req, res) =>{
    res.json({
        token: jwt.sign({user: req.user._id}, process.env.SECRET_KEY, {expiresIn: "1d"}),
    });
};

const verify =  async (req,res) =>{
    res.json(req.user);
};


module.exports = {
    signup,
    login,
    verify
}