
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.params.uid; 

    if (file.fieldname === 'profileImage') {
      cb(null, `./uploads/profiles/${userId}`);
    } else if (file.fieldname === 'productImage') {
      cb(null, `./uploads/products/${userId}`);
    } else if (file.fieldname === 'document') {
      cb(null, `./uploads/documents/${userId}`);
    } else {
      cb(new Error('Tipo de archivo no válido'), null);
    }
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
