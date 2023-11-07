const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Product Routes', () => {
  it('debería recibir la lista de productos', (done) => {
    chai.request(app)
      .get('/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('debería obtener un producto por su ID', (done) => {
    chai.request(app)
      .get('/products/64d2b0310b47ee9085493129')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('debería crear un nuevo producto', (done) => {
    const nuevoProducto = {
      nombre: 'Nuevo Producto',
      precio: 10.0,
    };

    chai.request(app)
      .post('/products')
      .send(nuevoProducto)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('nombre', 'Nuevo Producto');
        done();
      });
  });

  it('debería actualizar un producto existente', (done) => {
    const productoActualizado = {
      nombre: 'Producto Actualizado',
    };

    chai.request(app)
      .put('/products/64d2b0310b47ee9085493129')
      .send(productoActualizado)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('nombre', 'Producto Actualizado');
        done();
      });
  });

  it('debería eliminar un producto por su ID', (done) => {
    chai.request(app)
      .delete('/products/64d2b0310b47ee9085493129')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Producto eliminado exitosamente');
        done();
      });
  });
});

  

