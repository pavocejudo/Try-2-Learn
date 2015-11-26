var build = module.exports.build = function(lang){
    if(lang === "Python2")
        return exec('docker build -t ubuntu -f test/Python2 test/', {}).output;
    if(lang === "Python3")
        return exec('docker build -t ubuntu -f test/Python3 test/', {}).output;
    if(lang === "Ruby")
        return exec('docker build -t ubuntu -f test/Ruby test/', {}).output;
}

var run = module.exports.run = function(){
    return exec('docker run --memory=128M -t ubuntu', {}).output;
}

var stop = module.exports.stop = function(path){
    return exec('docker stop $(docker ps -a -q) && rm ' + path, {}).output;
}


