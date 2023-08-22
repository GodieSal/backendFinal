import mongoose from "mongoose"
const mongoose = require('mongoose');

const esquemaProducto = new mongoose.Schema({
  nombre: String,
  precio: Number,
  quantity: Number,
  id: String
});

const Producto = mongoose.model('Producto', esquemaProducto);
const mongoose = require('mongoose');

