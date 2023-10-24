const express = require("express");
const routerProducts = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const Product = require('../dao/models/products'); 

const todoslosProductos = JSON.parse(fs.readFileSync("./dao/filemanager/productos.json", "utf8", (error) => {
  throw Error(error);
}));
const products = [...todoslosProductos];


routerProducts.get('/', async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  let filter = {};

  if (query) {
    if (query === 'available' || query === 'unavailable') {
      filter = { availability: query === 'available' };
    }
  }
  
  const options = {
    limit: parseInt(limit),
    skip: (parseInt(page) - 1) * parseInt(limit),
    sort: sort === 'asc' ? 'price' : sort === 'desc' ? '-price' : null
  };

  try {
    const totalCount = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / options.limit);
    const products = await Product.find(filter, null, options);

    const response = {
      status: 'success',
      payload: products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page: page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}` : null,
      nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${page + 1}` : null
    };

    res.json(response);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
  }
});


routerProducts.get('/mockingproducts', (req, res) => {
  const numProducts = 100; 
  const mockedProducts = [];

  for (let i = 0; i < numProducts; i++) {
    const product = {
      id: uuidv4(), 
    };

    mockedProducts.push(product);
  }

  res.json(mockedProducts);
});

routerProducts.get('/:pid', async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await Product.findOne({ id: pid });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    res.status(500).send('Error al obtener producto por ID');
  }
});

routerProducts.post('/', async (req, res) => {
  const nuevoProductoData = req.body;

  try {
    const nuevoProducto = await Product.create(nuevoProductoData);
    res.send('Producto añadido en MongoDB');
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).send('Error al agregar producto');
  }
});

module.exports = routerProducts;
