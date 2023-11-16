const express = require('express');
const router = express.Router();
const UserController = require('../dao/controllers/userController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/documents/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.put('/users/premium/:userId', UserController.updateUserRoleToPremium);

router.post('/users/:userId/documents', upload.array('documents', 5), UserController.uploadDocuments);

module.exports = router;
