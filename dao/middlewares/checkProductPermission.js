const Producto = require('../models/products');
const User = require('../models/user');


const checkProductPermission = async (req, res, next) => {
  try {
    
    const productId = req.params.id;


    const currentUser = req.user;

    const product = await Producto.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (currentUser.role === 'premium' && product.owner !== currentUser.email) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
    }


    next();
  } catch (error) {
    console.error('Error al verificar permisos de eliminación:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = checkProductPermission;
