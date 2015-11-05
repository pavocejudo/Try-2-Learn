var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello world */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
  res.status(200).send('ok');
});

module.exports = router;
