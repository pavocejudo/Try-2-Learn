module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bgShell: {
            runNode: {
                cmd: 'node server.js',
                bg: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-bg-shell');
    grunt.registerTask('server', ['bgShell:runNode']);
};
