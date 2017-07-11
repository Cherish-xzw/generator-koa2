const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.sourceRoot(path.join(__dirname, '../templates'));
    }

    copyFiles() {
        this.fs.copy(
            this.templatePath('**'),
            this.destinationPath(), {
                globOptions: {
                    dot: true
                }
            }
        );
    }
}