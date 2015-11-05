require('shelljs/global');
var execute = function(command){
    exec(command, function(status, output) {
        console.log(command);
        console.log('Exit status:', status);
    });
};
exports.execute = execute;

