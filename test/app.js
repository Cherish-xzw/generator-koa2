const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('koa2:app', function () {

    beforeEach(function () {
        this.koa2 = helpers
            .run(path.join(__dirname, '../app'));
    });

    describe('default settings', function () {

        beforeEach(function (done) {
            this.koa2
                .withArguments(['testAppName'])
                .on('end', done);
        });

        it('will generate base files', function () {
            assert.file([
                'README.md',
                'package-lock.json',
                'index.js',
                'build/webpack.config.js',
                'src/index.js',
                '.babelrc'
            ]);
        });

        it('will replace appname', function () {
            assert.fileContent('package.json', new RegExp(`"name": "${this.koa2.generator.appname}"`));
        });
    });

    describe('--vue', function () {
        beforeEach(function (done) {
            this.koa2
                .withOptions({
                    vue: true
                })
                .on('end', done);
        });

        it('should generate vue files', function () {
            assert.file([
                'index.html',
                'index.js'
            ]);
        });
    });
});