var should = require("should"),
    exec = require("child_process").exec;

describe('Docker tests', function() {
    var captured_stdout;
    before(function (done) {
        exec('docker -v', function (error, stdout, stderr) {
            if (error) done(error); // Handle errors.
            captured_stdout = stdout;
            done();
        });
    });

    it('Docker instalado', function() {
        captured_stdout.should.containEql('version');
    });
});

