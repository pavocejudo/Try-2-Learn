var template = require('../views/template-main');  
exports.get = function(req, res) {  
  res.writeHead(404, {
    'Content-Type': 'text/html'
  });
  res.write(template.build("404 - Page not found", "Error 404", "<p>Página no encontrada!</p>"));
  res.end();
};