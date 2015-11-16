var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/compiled',function(req, res, next) {
    require('shelljs/global');
    var code = req.body.description;
    var path = 'test/hello.py',
        fs = require('fs'),
        buffer = new Buffer(req.body.description.toString());
    fs.open(path, 'w', function(err, fd) {
        if (err) {
            throw 'error opening file: ' + err;
        }

        fs.write(fd, buffer, 0, buffer.length, null, function(err) {
            if (err) throw 'error writing file: ' + err;
            fs.close(fd, function() {
                console.log('hello.py written');
                var data = exec('docker build -t home/ubuntu-python-hello test/', {}).output;
                console.log('image built');
                data = exec('docker run -t home/ubuntu-python-hello', {}).output;
                console.log('image runs');
                res.render('compiled', { data: data.toString(), code: code });
                var data2 = exec('docker stop $(docker ps -a -q)', {}).output;    
            })
        });
    });
    
    
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
