/* Función que crea un directorio temporal, crea un Dockerfile adecuado,
crea un fichero fuente con el código del usuario */
var create_dir = module.exports.create_dir = function(path,lang,code){
    //Creamos directorio 
    exec('mkdir utils/' + path, {});
    //Copiamos el timer a este directorio
    var fs = require('fs');
    var endfile = '';
    if(lang === 'Python2'){
        exec('cp utils/timer_python.sh utils/' +  path, {});
        endfile = '.py';
        fs.writeFile('utils/' + path + '/Dockerfile', 'FROM ubuntu:latest\nRUN apt-get install -y python\nCOPY timer_python.sh timer_python.sh\nCOPY hello.py hello.py\nCMD bash timer_python.sh', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Dockerfile written python");
        });
    }
    if(lang === 'Python3'){
        exec('cp utils/timer_python3.sh utils/' +  path, {});
        endfile = '.py';
        fs.writeFile('utils/' + path + '/Dockerfile', 'FROM ubuntu:latest\nRUN apt-get install -y python3\nCOPY timer_python3.sh timer_python3.sh\nCOPY hello.py hello.py\nCMD bash timer_python3.sh', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Dockerfile written python3");
        });
    }
    if(lang === 'Ruby'){
        exec('cp utils/timer_ruby.sh utils/' +  path, {});
        endfile = '.rb';
        fs.writeFile('utils/' + path + '/Dockerfile', 'FROM ubuntu:latest\nRUN apt-get install -y ruby\nCOPY timer_ruby.sh timer_ruby.sh\nCOPY hello.rb hello.rb\nCMD bash timer_ruby.sh', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Dockerfile written ruby");
        });
    }
    if(lang === 'C++'){
        exec('cp utils/timer_c.sh utils/' +  path, {});
        endfile = '.cpp';
        fs.writeFile('utils/' + path + '/Dockerfile', 'FROM ubuntu:latest\nRUN apt-get update\nRUN apt-get install -y build-essential\nCOPY timer_c.sh timer_c.sh\nCOPY hello.cpp hello.cpp\nRUN g++ hello.cpp -o hello\nCMD bash timer_c.sh', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Dockerfile written C");
        });
    }
    if(lang === 'Java'){
        exec('cp utils/timer_java.sh utils/' +  path, {});
        endfile = '.cpp';
        fs.writeFile('utils/' + path + '/Dockerfile', 'FROM ubuntu:latest\nRUN apt-get install -y python-software-properties\nRUN apt-get install -y software-properties-common\nRUN add-apt-repository -y ppa:webupd8team/java\nRUN apt-get update\nRUN echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections\nRUN apt-get install -y oracle-java7-installer\nCOPY timer_java.sh timer_java.sh\nCOPY hello.java hello.java\nRUN javac hello.java \nCMD bash timer_java.sh', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Dockerfile written C");
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
    return exec('docker build -t ubuntu/' + path + ' -f utils/' + path + '/Dockerfile utils/' + path, {}).output;
}


/* Función que corre el contenedor docker */
var run = module.exports.run = function(path,ram){
    console.log('Running a container with ' + ram + 'MB of RAM...');
    return exec('docker run --memory=' + ram + 'M --cpu-quota=50000 ubuntu/' + path, {}).output;
}

/* Función que detiene todos los contenedores en status 'Exited', la imagen creada y elimina el directorio 
usado por el cliente */
var stop = module.exports.stop = function(path){
    exec("docker ps -a | grep 'Exited' | awk '{print $1}' | xargs docker rm", {}).output;
    exec('docker rmi ubuntu/' + path , {}).output;
    return exec('rm -r utils/' + path , {}).output;
}


