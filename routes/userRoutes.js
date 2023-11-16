const express = require('express');
const router = express.Router();
const UserController = require('../dao/controllers/userController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = determineFolder(file);
    cb(null, `uploads/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


function determineFolder(file) {
  return 'documents';
}

router.post('/users/:userId/documents', upload.array('files'), UserController.uploadDocuments);
router.put('/users/premium/:userId', UserController.updateUserRoleToPremium);

module.exports = router;
