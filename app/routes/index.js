var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello world */
router.get('/readcode', function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.render('readcode', { title: 'Lector de código' });
  res.end();
});


router.post('/readcode',function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.send('post ok');
    res.end();
});

module.exports = router;
