const Cart = require('../models/carts');
const Product = require('../models/products');
const TicketService = require('../services/ticketService');

exports.purchaseCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const user = req.user; 
    const cart = await Cart.findById(cartId).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    for (const item of cart.items) {
      const product = item.product;
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock insuficiente para ${product.name}` });
      }
    }

    const ticket = await TicketService.createTicket(cart, user);

    res.status(201).json({ message: 'Compra realizada con éxito', ticket });
  } catch (error) {
    console.error('Error al procesar la compra:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
