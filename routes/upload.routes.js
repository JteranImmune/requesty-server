const { Router } = require('express');
const { attachmentsUploadMiddleware } = require('../middlewares/upload.middleware');
const { uploadAttachments, uploadAvatar } = require('../controllers/upload.controller');

const router = Router();

router.post('/upload', attachmentsUploadMiddleware, uploadAttachments);
router.post('/upload', attachmentsUploadMiddleware, uploadAvatar);

module.exports = router;