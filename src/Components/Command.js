module.exports = class Command {
  constructor(commandFile) {
    this.commandFile = commandFile;
  }

  readUserCommand() {
    let fs = require("fs");
    let commandArray = fs
      .readFileSync(this.commandFile, "utf8")
      .toString()
      .split("\n");

    return commandArray;
  }
};
