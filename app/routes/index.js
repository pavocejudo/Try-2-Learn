var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/upload',function(req, res, next) {
  res.send("Código recibido:\n" + req.body.description);
});
/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about');
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

/* GET ps page */
router.get('/ps', function(req,res,next) {
    require('shelljs/global');
    var data = exec('ps', {}).output;
    res.render('version', { stdout: data.toString() });

});





module.exports = router;
