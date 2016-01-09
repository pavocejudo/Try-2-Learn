var express = require('express');
var router = express.Router();
var fs = require('fs');
// Lista de lenguajes disponibles para usar.
var langs = ["Python2", "Python3", "Ruby", "C++", "Java"];
// GET index page. 
router.get('/', function(req, res, next) {
  res.render('index', { langs: langs });
});
// POST compiled page.
router.post('/compiled',function(req, res, next) {
    require('shelljs/global');
    //Comprueba si docker está instalado en el servidor.
    var is_installed = exec('dpkg -l | grep docker', {}).output;
    if(is_installed === ''){
        res.render('compiled_error', { error: 'docker not installed', build: data_build.toString()});
    }else{
        var docker = require('../utils/utils');
        var lang = langs[parseInt(req.body.language)];
        var ram = req.body.ram;
        var code = req.body.description;
        // Una forma de asegurar nombre único para el path del directorio temporal del usuario.
        var path = (Date.now() / 1000 | 0).toString();
        docker.create_dir(path,lang,code);
        // Establece un timeout para esperar a la función create_dir.
        setTimeout(function(){
            var data_build = docker.build(path);
            // Establece un timeout para esperar a la función build.
            setTimeout(function(){
                console.log('waiting for build...');
            },3000);            
            var data = docker.run(path,ram);
            // Comprobación de diversos errores tras construir la imagen docker y ejecutar un contenedor basado en ella.            
            if(data.search('ERROR') != -1){
                res.render('compiled_error', { error: 'Execution time exceeded, probably there is an infinite loop in your code...', build: data_build.toString() });
            }else if(data.search('Unable to find image') != -1){
                res.render('compiled_error', { error: 'Compilation error, something was wrong in your code', build: data_build.toString() });
            }else if((data.search('timer') != -1) && (data.search('Killed') != -1)){
                res.render('compiled_error', { error: 'RAM usage exceeded', build: data_build.toString() });
            }else{            
                res.render('compiled', { data: data.toString(), code: code, lang: langs[parseInt(req.body.language)], build: data_build.toString() });
            }
            data = docker.stop(path);
        }, 3000);
    }
});

// GET about page. 
router.get('/about', function(req, res, next) {
  res.render('about');
});

// GET contact page. 
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

// GET ps page(only for debug). 
router.get('/ps', function(req,res,next) {
    require('shelljs/global');
    var data = exec('ps', {}).output;
    res.render('version', { stdout: data.toString() });

});

module.exports = router;
