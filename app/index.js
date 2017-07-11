const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.sourceRoot(path.join(__dirname, '../templates'));
    }

    copyFiles() {
        this.fs.copy(
            this.templatePath('**/!(package.json)'),
            this.destinationPath(), {
                globOptions: {
                    dot: true
                }
            }
        );
    }

    replaceAppname() {
        const pkg = this.fs.readJSON(this.templatePath('package.json'));
        pkg.name = this.appname;
        this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    }
}