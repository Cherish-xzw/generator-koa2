const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('koa2:app', function () {

    beforeEach(function () {
        this.koa2 = helpers
            .run(path.join(__dirname, '../app'))
            .withArguments(['testAppName']);
    });

    describe('default settings', function () {

        beforeEach(function (done) {
            this.koa2.on('end', done);
        });

        it('will generate base files', function () {
            assert.file([
                'package.json',
                'README.md',
                'package-lock.json',
                'index.js',
                'build/webpack.config.js',
                'src/index.js',
                '.babelrc'    
            ]);
        });
    });
});