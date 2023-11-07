const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

// Importa tu aplicación Express (asegúrate de que la ruta sea correcta)
const app = require('../app'); 

// Crea una instancia de supertest con tu aplicación Express
const request = supertest(app);

describe('Router de Productos', () => {
  it('debería obtener todos los productos', (done) => {
    request
      .get('/api/products') 
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });

  it('debería crear un nuevo producto', (done) => {
    const nuevoProducto = {
      nombre: 'Producto',
      precio: 10,
    };

    request
      .post('/api/products') 
      .send(nuevoProducto)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('debería obtener un producto por ID', (done) => {
    // Reemplaza 'ID_de_producto_existente' con un ID real
    const productId = 'ID_de_producto_existente';

    request
      .get(`/api/products/${productId}`) // Ajusta la ruta y el ID según tu enrutador de productos
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });
});
