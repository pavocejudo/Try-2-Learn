module.exports = function(grunt) {
    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                  reporter: 'dot'
                },
                src: ['test/test.js' ]
            }
        },
        run: {
            clean: {
                cmd: 'rm .r',
                args: [
                    'node_modules',
                    'docs'
                ]
            },
            doc: {
                cmd: './node_modules/.bin/docco',
                args: [
                    'routes/index.js',
                    'test/test.js',
                    'utils/utils.js'
                ]
            },
            start: {
                cmd: 'npm',
                args: [
                    'start'
                ]
            },
        },
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('default','help', function() {
        console.log('grunt test');
        console.log('grunt doc');
        console.log('grunt start');
        console.log('grunt clean');
    });

    grunt.registerTask('test', 'mochaTest');
    grunt.registerTask('clean', ['run:clean']);
    grunt.registerTask('doc',['run:doc']);
    grunt.registerTask('start', ['run:start']);
};

