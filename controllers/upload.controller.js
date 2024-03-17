const { Types } = require('mongoose');
const Task = require( '../models/task.model.js' );

const uploadAttachments =  async ( req, res, next) => {

    try {

        const attachments = req.files;

        const attachmentData = attachments.map(attachment =>({
            filename: attachment.filename,
            mimetype: attachment.mimetype,
            size:attachment.size
        }));
        
        if (!req.files) return res.status(400).send({ error: "No file provided" });

        res.send({
            status: true,
            message: 'attachments uploaded',
            data: attachmentData,
        })

    } catch (err) {
        next(err);
    };
};

const uploadAvatar =  async ( req, res, next) => {

    try {
        const avatars = req.files[0];

        console.log(avatars);

        const avatarsData = avatars.map(avatar =>({
            filename: avatar.filename,
            mimetype: avatar.mimetype,
            size:avatar.size
        }));
        
        if (!req.files[0]) return res.status(400).send({ error: "No file provided" });

        res.send({
            status: true,
            message: 'Avatar uploaded',
            data: avatarsData,
        });

    } catch (err) {
        next(err);
    };
};

module.exports = {
    uploadAttachments,
    uploadAvatar
};