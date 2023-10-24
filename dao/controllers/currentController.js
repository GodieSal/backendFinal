const User = require('../models/user');
const UserDTO = require('../dto/userDto'); 

exports.getCurrentUserInfo = async (req, res) => {
  try {
    
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const userFromDatabase = req.user;

    const userDTO = new UserDTO(
      userFromDatabase.id,
      userFromDatabase.first_name,
      userFromDatabase.last_name,
      userFromDatabase.email
    );

    res.json(userDTO);
  } catch (error) {
    console.error('Error al obtener la información del usuario actual:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
