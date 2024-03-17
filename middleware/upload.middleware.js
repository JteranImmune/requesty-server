const cloudinary = require("cloudinary").v2
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

          
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storageClientsAttachments = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        allowed_formats: ["jpg", "png", "pdf"],
        folder: "task-attachments"
    }
})

const storageAvatar = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        allowed_formats: ["jpg", "png"],
        folder: "avatars"
    }
})

const multerInstance = multer({ storageClientsAttachments })
const multerInstanceAvatar = multer({ storageAvatar })

const attachmentsUploadMiddleware = multerInstance.array('task-image', 10);
const avatarsUploadMiddleware = multerInstanceAvatar.array('avatar', 1); 

module.exports = { attachmentsUploadMiddleware, avatarsUploadMiddleware }