const { Types } = require('mongoose');
const User = require( '../models/user.model.js' );

const listAllTeamUsers = async ( _req, res, next ) => {
    try{

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
          };

        const users = await User.find({ role: "Team" })
                                .sort({ createdAt: -1 })
                                .select('_id name email role avatar createdAt')
                                .lean();
        console.log("List of Users with Role Team");

        const orderedUsers = users.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role || 'Unassigned',
            avatar: user.avatar ? user.avatar.url : 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/05/05ab5b380d37342ce7dd5c8981eb91d2c4b3a75e.jpg',
            createdAt: formatDate(user.createdAt) || '',
        }));


        res.status(200).json(orderedUsers);
        
    }catch(err){
        next(err);
    }
};

const getOneTeamUser = async ( req, res, next )=>{
    try {
        const { user_id }  = req.params;
        if (!Types.ObjectId.isValid(user_id)) return res.status(400).json({msg: "Invalid user ID"});

        const user = await User.findById(user_id);

        if(!user) return res.status(404).json({ msg : "No user with this ID." });

        res.status(200).json(user);

    } catch (err) {
        next(err);
    }
}

// const createNewTeamUser = async ( req, res, next ) => {
//     const {
//         name,
//         role,
//         avatar,
//         email,
//         password,
//     } = req.body;
//     try {
//         if(!name || !email || !avatar || !role){
//             return res.status(400).json({ msg : "Missing fields!" })
//         }

//         await User.create({
//             name,
//             role: "Team",
//             avatar,
//             email,
//             password,
//         });
//         res.sendStatus(201);
//     } catch (err) {
//         next(err);
//     }
// };

const editOneTeamUser = async (req,res,next)=> {
    const { user_id } = req.params;
    const { 
        name,
        role,
        avatar,
        email,
    } = req.body;
    try {

        if (!Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ msg: 'Invalid User ID!' });
        }

        const user = await User.findByIdAndUpdate(user_id, 
            {
                name,
                role,
                avatar,
                email,
            },
            {new:true} 
            ).select('-createdAt -updateAdt');
        
        if(!user) return res.status(404).json({ msg : "User ID not found for update" });

        res.status(200).json(user);
        
    } catch (err) {
        next(err);
    }
    

};

const deleteOneTeamUser = async (req,res,next)=>{
    const { user_id } = req.params;

    try {

        if (!Types.ObjectId.isValid(user_id)) return res.status(400).json({msg: "Invalid Service ID"});

        const user = await Service.findByIdAndDelete(user_id);

        if(!user) return res.status(404).json({msg:"No Service with this ID was found."});

        res.status(200).json({msg:"The Service has been deleted successfully."});
        
    } catch (err) {
        next(err);
    }
};

module.exports = {
    listAllTeamUsers,
    getOneTeamUser,
    // createNewTeamUser,
    editOneTeamUser,
    deleteOneTeamUser,
};