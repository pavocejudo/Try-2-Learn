var build = module.exports.build = function(lang){
    if(lang === "Python2")
        return exec('docker build -t home/ubuntu -f test/Python2 test/', {}).output;
}

var run = module.exports.run = function(){
    //return exec('docker run -t home/ubuntu', {}).output;
    return exec('apt-get install -y docker-engine', {}).output;
}

var stop = module.exports.stop = function(path){
    return exec('docker stop $(docker ps -a -q) && rm ' + path, {}).output;
}


