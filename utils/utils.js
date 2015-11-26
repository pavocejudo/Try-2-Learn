var build = module.exports.build = function(lang){
    return "test";
//    if(lang === "Python2")
//        return exec('docker build -t ubuntu -f test/Python2 test/', {}).output;
    
}

var run = module.exports.run = function(){
    //return exec('docker run -t ubuntu', {}).output;
    return exec('docker run ubuntu:14.04 /bin/echo "Hello world"', {}).output
}

var stop = module.exports.stop = function(path){
    return exec('docker stop $(docker ps -a -q) && rm ' + path, {}).output;
}


