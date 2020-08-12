const readRobotMoveData = (robotMoveDataTxtFile) => {
  let fs = require("fs");
  let moveDataArray = fs
    .readFileSync(robotMoveDataTxtFile, "utf8")
    .toString()
    .split("\n");
  console.log(moveDataArray);

  return moveDataArray;
};

module.exports = {
  readRobotMoveData,
};
