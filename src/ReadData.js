const readRobertMoveData = (robertMoveDataTxtFile) => {
  let fs = require("fs");
  let moveDataArray = fs
    .readFileSync(robertMoveDataTxtFile, "utf8")
    .toString()
    .split("\n");
  console.log(moveDataArray);

  return moveDataArray;
};

module.exports = {
  readRobertMoveData,
};
