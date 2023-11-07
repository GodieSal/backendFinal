const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Cart Routes', () => {
  it('debería obtener una lista de carritos', (done) => {
    chai.request(app)
      .get('/carts')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('debería obtener un carrito por su ID', (done) => {
    chai.request(app)
      .get('/carts/64dbe92273dc8a5425231539') 
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  
});
