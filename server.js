var http_IP = '127.0.0.1';
var http_port = 8899;
var http = require('http');
var server;
var boot = function(){
    server = http.createServer(function (req, res) {
    require('./router').get(req, res);
}); // end server() 
server.listen(http_port, http_IP);
console.log('listening to http://' + http_IP + ':' + http_port);  
}
var shutdown = function(){
    server.close();
}
exports.boot = boot;
exports.shutdown = shutdown;
exports.port = http_port;