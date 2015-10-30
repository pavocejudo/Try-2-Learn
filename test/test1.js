var boot = require('../server').boot,
        shutdown = require('../server').shutdown,
        port = require('../server').port,
        request = require('request'),
        expect = require('expect');
    describe('Test de arrancado de servidor', function () {
        before(function () {
            boot();
    });
    describe('server.js', function () {
        it('Probando método GET', function () {
            request('http://127.0.0.1:'+port, function (error, response,body) {
                if (!error && response.statusCode == 200) {
                    console.log("Server ON");
                }
            });
        })
    });
    after(function () {
        shutdown();
    });
    
});