const cloudinary = require("../utils/cloudinary")
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
          

const storageClientsAttachments = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        allowed_formats: ["jpg", "png", "pdf", "svg"],
        folder: "task-attachments",
        resource_type: "image",
    }
})

const storageAvatar = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        allowed_formats: ["jpg", "png"],
        folder: "avatars"
    }
})

// const localStorage = multer.diskStorage({
//     filename: function (req,file,cb) {
//       cb(null, file.originalname)
//     }
//   });

const multerInstance = multer({ storage: storageClientsAttachments })
const multerInstanceAvatar = multer({ storageAvatar })

const attachmentsUploadMiddleware = multerInstance.array('task-image', 10);
const avatarsUploadMiddleware = multerInstanceAvatar.array('avatar', 1); 

module.exports = { attachmentsUploadMiddleware, avatarsUploadMiddleware }