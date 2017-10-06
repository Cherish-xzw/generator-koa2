const Generator = require("yeoman-generator");
const path = require("path");
const download = require("download-git-repo");
const ora = require("ora");
const exists = require("fs").existsSync;
const rm = require("rimraf").sync;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.__template = this.options.vue ? "koa2-vue" : "koa2";
    this.repo = this.options.vue
      ? "Cherish-xzw/koa2-vue-boilerplate"
      : "Cherish-xzw/koa2-boilerplate";
  }

  sync() {
    const self = this;
    const done = this.async();
    const temp = this.templatePath(this.__template);
    const spinner = ora("downloading tempaltes...");
    spinner.start();
    if (exists(temp)) rm(temp);
    download(this.repo, temp, err => {
      spinner.stop();
      if (err) {
        this.log(`Failed to download repo ${self.repo}: , ${err.message}`);
        done(err);
      }
      this.log(`Success download repo to ${self.templatePath()}`);
      done();
    });
  }

  copyFiles() {
    this.fs.copy(
      this.templatePath(this.__template + "/**/!(package.json)"),
      this.destinationPath(),
      {
        globOptions: {
          dot: true
        }
      }
    );
  }

  replaceAppname() {
    const pkg = this.fs.readJSON(
      this.templatePath(this.__template + "/package.json")
    );
    pkg.name = this.appname;
    this.fs.writeJSON(this.destinationPath("package.json"), pkg);
  }
};
