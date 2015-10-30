var assert = require("assert");
web = require(__dirname+"/../server.js");

describe('Test 1',function(){
    it('Probando a cargar server.js', function(){
        assert(web,"Cargado");
    });
});

