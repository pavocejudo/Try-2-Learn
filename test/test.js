var request = require('supertest');
require('shelljs/global');
describe('Express test', function () {
    var server;
    beforeEach(function () {
        server = require('../app');
    });
    //Prueba unitaria para comprobar que el servidor responde a la url existente '/' con código 200
    it('responds to /', function testSlash(done) {
        request(server)
        .get('/')
        .expect(200, done);
    });
    //Prueba unitaria para comprobar que una url no existente devuelve error 404.
    it('404 everything else', function testPath(done) {
        request(server)
        .get('/url/ficticia')
        .expect(404, done);
    });
});


