/* Función que crea un directorio temporal, crea un Dockerfile adecuado,
crea un fichero fuente con el código del usuario */
var create_dir = module.exports.create_dir = function(path,lang,code){
    //Creamos directorio 
    exec('mkdir utils/'+path, {});
    var fs = require('fs');
    var endfile = '';
    if(lang === 'Python2'){
        endfile = '.py';
        fs.writeFile('utils/' + path + '/Dockerfile', 'FROM ubuntu:latest\nRUN apt-get install -y python\nCOPY hello.py hello.py\nCMD python hello.py', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Dockerfile written");
        });
    }
    if(lang === 'Python3'){
        endfile = '.py';
        fs.writeFile('utils/' + path + '/Dockerfile', 'FROM ubuntu:latest\nRUN apt-get install -y python3\nCOPY hello.py hello.py\nCMD python3 hello.py', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Dockerfile written");
        });
    }
    if(lang === 'Ruby'){
        endfile = '.rb';
        fs.writeFile('utils/' + path + '/Dockerfile', 'FROM ubuntu:latest\nRUN apt-get install -y ruby\nCOPY hello.rb hello.rb\nCMD ruby hello.rb', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Dockerfile written");
        });
    
    }
    fs.writeFile('utils/' + path + '/hello' + endfile, code.toString(), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Code written");
    });

}

/* Función que crea la imagen docker */
var build = module.exports.build = function(path){
    return exec('docker build -t ubuntu' + path + ' utils/' + path, {}).output;
}

/* Función que corre el contenedor docker */
var run = module.exports.run = function(path,ram){
    console.log('Running a container with ' + ram + 'MB of RAM...');
    return exec('docker run --memory=' + ram + 'M --cpu-quota=50000 --name=' + path + ' -t ubuntu', {}).output;
}

/* Función que detiene todos los contenedores docker y elimina el directorio 
usado por el cliente */
var stop = module.exports.stop = function(path){
    return exec('docker rmi ubuntu' + path + ' && rm -r utils/' + path , {}).output;
}


