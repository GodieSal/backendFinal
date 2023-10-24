const express = require("express");
const routerCarts = express.Router();
const Cart = require('../dao/models/carts'); 
const mongoose = require('mongoose');

// Obtener carrito
routerCarts.get('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(cid);

    if (!isValidObjectId) {
      return res.status(400).json({ message: 'ID de carrito inválido' });
    }

    const carrito = await Cart.findOne({ _id: cid }).populate('productosCarrito.producto');
    
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    res.send(carrito);
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    res.status(500).send('Error al obtener carrito');
  }
});

routerCarts.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(cid);

    if (!isValidObjectId) {
      return res.status(400).json({ message: 'ID de carrito inválido' });
    }

    await Cart.updateOne({ _id: cid }, { productosCarrito: products });
    res.send('Carrito actualizado con productos en MongoDB');
  } catch (error) {
    console.error('Error al agregar productos al carrito:', error);
    res.status(500).send('Error al agregar productos al carrito');
  }
});

routerCarts.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(cid);

    if (!isValidObjectId) {
      return res.status(400).json({ message: 'ID de carrito inválido' });
    }

    await Cart.updateOne(
      { _id: cid, 'productosCarrito.producto': pid },
      { $set: { 'productosCarrito.$.quantity': quantity } }
    );
    res.send('Cantidad de producto actualizada en MongoDB');
  } catch (error) {
    console.error('Error al actualizar cantidad de producto en el carrito:', error);
    res.status(500).send('Error al actualizar cantidad de producto en el carrito');
  }
});

routerCarts.delete('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(cid);

    if (!isValidObjectId) {
      return res.status(400).json({ message: 'ID de carrito inválido' });
    }

    await Cart.updateOne({ _id: cid }, { productosCarrito: [] });
    res.send('Productos eliminados del carrito en MongoDB');
  } catch (error) {
    console.error('Error al eliminar productos del carrito:', error);
    res.status(500).send('Error al eliminar productos del carrito');
  }
});

module.exports = routerCarts;
