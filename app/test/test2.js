var should = require("should"),
    exec = require("child_process").exec;

describe('Docker tests', function() {
    var vout,imgout;
    before(function (done) {
        exec('docker -v', function (error, stdout, stderr) {
            if (error) done(error); // Handle errors.
            vout = stdout;
            done();
        });
    });
    it('docker -v', function() {
        vout.should.containEql('version');
    });
    before(function (done) {
        exec('docker images', function (error, stdout, stderr) {
            if (error) done(error); // Handle errors.
            imgout = stdout;
            done();
        });
    });
    it('docker images', function() {
        imgout.should.containEql('REPOSITORY');
    });
});

