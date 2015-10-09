/* Iniciamos el módulo http */
var http = require("http");

function serverStart() {
    /* Creamos el objeto del servidor */
    http.createServer(function(request, response) {
        /* Preparamos las cabeceras de respuesta */
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("Hello world");
        response.end();
    }).listen(8888);
    console.log("Server started...\nIP: http://localhost:8888");
}

exports.start = serverStart;
