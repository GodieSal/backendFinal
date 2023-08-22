const express = require("express");
const routerCarts = express.Router();
const fs = require("fs");
const Cart = require('../dao/models/carts'); // Importa el modelo de Mongoose para Cart

// Obtener carrito
routerCarts.get('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    if (process.env.USE_MONGODB === 'true') {
      const carrito = await Cart.findOne({ id: cid }).populate('productosCarrito.producto');
      res.send(carrito);
    } else {
      const carrito = carritos.find(c => c.id === cid);
      res.send(carrito);
    }
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    res.status(500).send('Error al obtener carrito');
  }
});

// Agregar productos al carrito
routerCarts.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    if (process.env.USE_MONGODB === 'true') {
      await Cart.updateOne({ id: cid }, { productosCarrito: products });
      res.send('Carrito actualizado con productos en MongoDB');
    } else {
      const carrito = carritos.find(c => c.id === cid);
      carrito.productosCarrito = products;
      fs.writeFileSync("./carrito.json", JSON.stringify(carritos), (err) => {
        if (err) {
          throw new Error(err);
        }
      });
      res.send('Carrito actualizado con productos con FileSystem');
    }
  } catch (error) {
    console.error('Error al agregar productos al carrito:', error);
    res.status(500).send('Error al agregar productos al carrito');
  }
});

// Actualizar cantidad de un producto en el carrito
routerCarts.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    if (process.env.USE_MONGODB === 'true') {
      await Cart.updateOne(
        { id: cid, 'productosCarrito.producto': pid },
        { $set: { 'productosCarrito.$.quantity': quantity } }
      );
      res.send('Cantidad de producto actualizada en MongoDB');
    } else {
      const carrito = carritos.find(c => c.id === cid);
      const productoEnCarrito = carrito.productosCarrito.find(p => p.producto === pid);
      if (productoEnCarrito) {
        productoEnCarrito.quantity = quantity;
        fs.writeFileSync("./carrito.json", JSON.stringify(carritos), (err) => {
          if (err) {
            throw new Error(err);
          }
        });
        res.send('Cantidad de producto actualizada con FileSystem');
      } else {
        res.status(400).send('Producto no encontrado en el carrito');
      }
    }
  } catch (error) {
    console.error('Error al actualizar cantidad de producto en el carrito:', error);
    res.status(500).send('Error al actualizar cantidad de producto en el carrito');
  }
});

// Eliminar todos los productos del carrito
routerCarts.delete('/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    if (process.env.USE_MONGODB === 'true') {
      await Cart.updateOne({ id: cid }, { productosCarrito: [] });
      res.send('Productos eliminados del carrito en MongoDB');
    } else {
      const carrito = carritos.find(c => c.id === cid);
      carrito.productosCarrito = [];
      fs.writeFileSync("./carrito.json", JSON.stringify(carritos), (err) => {
        if (err) {
          throw new Error(err);
        }
      });
      res.send('Productos eliminados del carrito con FileSystem');
    }
  } catch (error) {
    console.error('Error al eliminar productos del carrito:', error);
    res.status(500).send('Error al eliminar productos del carrito');
  }
});

module.exports = routerCarts;
