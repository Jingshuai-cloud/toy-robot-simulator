const readUserCommand = (robotCommandTxtFile) => {
  let fs = require("fs");
  let moveCommandArray = fs
    .readFileSync(robotCommandTxtFile, "utf8")
    .toString()
    .split("\n");

  return moveCommandArray;
};

module.exports = {
  readUserCommand,
};
