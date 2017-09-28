const Generator = require("yeoman-generator");
const path = require("path");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.__template = this.options.vue ? "koa2-vue" : "koa2";
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
