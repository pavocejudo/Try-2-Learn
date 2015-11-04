var template = require('../views/template-main');  
exports.get = function(req, res) {  
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(template.build("Test web page on node.js", "Hello world!", "<p>Probando modelo MVC con node.js</p>"));
  res.end();
};
