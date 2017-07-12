const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    copyFiles() {
        if (this.options.vue) {
            return this.fs.copy(
                this.templatePath('koa2-vue/**/!(package.json)'),
                this.destinationPath(), {
                    globOptions: {
                        dot: true
                    }
                }
            );
        }
        this.fs.copy(
            this.templatePath('koa2/**/!(package.json)'),
            this.destinationPath(), {
                globOptions: {
                    dot: true
                }
            }
        );
    }

    replaceAppname() {
        const pkg = this.fs.readJSON(this.templatePath('koa2/package.json'));
        pkg.name = this.appname;
        this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    }
}