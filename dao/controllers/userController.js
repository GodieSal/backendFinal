const mongoose = require('mongoose');
const userRepository = require('./repositories/userRepository');

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const user = await userRepository.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener información del usuario por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
