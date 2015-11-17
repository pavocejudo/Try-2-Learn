var express = require('express');
var router = express.Router();
var fs = require('fs');
var langs = ["Python2", "Python3", "Ruby"];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { langs: langs });
});
router.post('/compiled',function(req, res, next) {
    require('shelljs/global');
    var code = req.body.description;
    var path = 'test/hello.py';
    var buffer = new Buffer(req.body.description.toString());
    var data = '', data2 = '';
    fs.open(path, 'w', function(err, fd) {
        if (err) {
            throw 'error opening file: ' + err;
        }

        fs.write(fd, buffer, 0, buffer.length, null, function(err) {
            if (err) throw 'error writing file: ' + err;
            fs.close(fd, function() {
                data = exec('docker build -t home/ubuntu -f test/docker_python test/', {}).output;
                data = exec('docker run -t home/ubuntu', {}).output;
                console.log('image runs');
                res.render('compiled', { data: data.toString(), code: code, lang: langs[parseInt(req.body.language)] });
                data2 = exec('docker stop $(docker ps -a -q)', {}).output;
            })
        });
    });
    data2 = exec('rm ' + path, {}).output;     
    
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
