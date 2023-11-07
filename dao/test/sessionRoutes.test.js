const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Session Routes', () => {
  it('debería crear una nueva sesión', (done) => {
    const userData = { username: 'usuario', password: 'contraseña' };
    chai.request(app)
      .post('/sessions')
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('debería cerrar sesión de un usuario autenticado', (done) => {

    const authData = { username: 'usuario', password: 'contraseña' };
    chai.request(app)
      .post('/sessions')
      .send(authData)
      .end((err, res) => {
        const token = res.body.token;

       
        chai.request(app)
          .delete('/sessions')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message', 'Sesión cerrada exitosamente');
            done();
          });
      });
  });
  
  it('debería recibir un error al cerrar sesión sin un token válido', (done) => {
    chai.request(app)
      .delete('/sessions')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Token de autenticación no proporcionado');
        done();
      });
  });
});
