const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  quantity: Number,
  id: String,
  owner: {
    type: String,
    default: 'admin', 
  },
});

const Producto = mongoose.model('Producto', productSchema);

module.exports = Producto;
