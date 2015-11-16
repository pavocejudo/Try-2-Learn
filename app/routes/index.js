var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/compiled',function(req, res, next) {
    require('shelljs/global');
    var code = req.body.description;
    var data = exec('docker build -t home/ubuntu-python-hello test/', {}).output;
    console.log(data.toString());
    data = exec('docker run -t home/ubuntu-python-hello', {}).output;
    var data2 = exec('docker stop $(docker ps -a -q)', {}).output;    
    res.render('compiled', { data: data.toString(), code: code });
    
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
