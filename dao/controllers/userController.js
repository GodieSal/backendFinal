const mongoose = require('mongoose');
const UserRepository = require('../repositories/userRepository');
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

exports.uploadDocuments = upload.array('documents', 5);

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const user = await UserRepository.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener información del usuario por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.updateUserRoleToPremium = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const user = await UserRepository.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!user.hasUploadedDocuments()) {
      return res.status(400).json({ message: 'El usuario no ha terminado de cargar la documentación.' });
    }

    
    user.last_connection = new Date();

    user.role = 'premium';
    await UserRepository.updateUserRoleToPremium(userId);

    res.json({ message: 'Rol de usuario actualizado a "premium"' });
  } catch (error) {
    console.error('Error al actualizar el rol del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.updateUserOwner = async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.body.productId;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'ID de usuario o ID de producto inválido' });
    }

    const user = await UserRepository.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.role !== 'premium') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    user.owner = productId;
    await user.save();

    res.json({ message: 'Propietario de usuario actualizado' });
  } catch (error) {
    console.error('Error al actualizar el propietario del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
