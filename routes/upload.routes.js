const { Router } = require('express');
const { attachmentsUploadMiddleware } = require('../middleware/upload.middleware');
const { uploadAttachments, uploadAvatar } = require('../controllers/upload.controller');

const router = Router();

router.post('/attachments', attachmentsUploadMiddleware, uploadAttachments);
router.post('/avatar', attachmentsUploadMiddleware, uploadAvatar);

module.exports = router;