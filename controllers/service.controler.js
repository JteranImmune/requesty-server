const { Types } = require('mongoose');
const Service = require( '../models/service.model.js' );

const listAllService = async ( _req, res, next ) => {
    try{
        const service = await Service.find().sort({createdAt: -1}).lean();
        console.log("List Service");
        res.status(200).json(service)
        
    }catch(err){
        next(err);
    }
};

const getOneService = async ( req, res, next )=>{
    try {
        const { service_id }  = req.params;
        if (!Types.ObjectId.isValid(service_id)) return res.status(400).json({msg: "Invalid Service ID"});

        const service = await Service.findById(service_id);

        if(!service) return res.status(404).json({ msg : "No service with this ID." });

        res.status(200).json(service);

    } catch (err) {
        next(err);
    }
}

const  createNewService = async ( req, res, next ) => {
    const {
        name,
        description,
        image,
        price,
    } = req.body;
    try {
        if(!name || !description || !image || !price){
            return res.status(400).json({ msg : "Missing fields!" })
        }

        await Service.create({
            name,
            description,
            image,
            price,
        });
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
};

const editOneService = async (req,res,next)=> {
    const { service_id } = req.params;
    const { 
        name,
        description,
        image,
        price, 
    } = req.body;
    try {

        if (!Types.ObjectId.isValid(service_id)) {
            return res.status(400).json({ msg: 'Invalid Service ID!' });
        }

        const service = await Service.findByIdAndUpdate(service_id, 
            {
                name,
                description,
                image,
                price,
            },
            {new:true} 
            ).select('-createdAt -updateAdt');
        
        if(!service) return res.status(404).json({ msg : "Service ID not found for update" });

        res.status(200).json(service);
        
    } catch (err) {
        next(err);
    }
    

};

const deleteOneService = async (req,res,next)=>{
    const { service_id } = req.params;

    try {

        if (!Types.ObjectId.isValid(service_id)) return res.status(400).json({msg: "Invalid Service ID"});

        const service = await Service.findByIdAndDelete(service_id);

        if(!service) return res.status(404).json({msg:"No Service with this ID was found."});

        res.status(200).json({msg:"The Service has been deleted successfully."});
        
    } catch (err) {
        next(err);
    }
};

module.exports = {
    listAllService,
    getOneService,
    createNewService,
    editOneService,
    deleteOneService,
};