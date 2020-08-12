const { allActions } = require("./robertAction");

const readRobertMoveData = (robertMoveDataTxtFile) => {
  let fs = require("fs");
  let moveDataArray = fs
    .readFileSync(robertMoveDataTxtFile, "utf8")
    .toString()
    .split("\n");
  console.log(moveDataArray);

  return moveDataArray;
};

const currentSituation = (moveDataArray) => {
  const allAction = allActions();

  let position = ["INITIAL", "INITIAL", "INITIAL"];

  for (let i = 0; i < moveDataArray.length; i++) {
    let command = moveDataArray[i].split(" ")[0];
    let action = allAction.getRobotAction(command);
    try {
      position = action(position, moveDataArray[i]);
    } catch (error) {
      console.log("invalid step");
    }
  }
};

const array = readRobertMoveData("./robertMoveData.txt");
currentSituation(array);

module.exports = {
  readRobertMoveData,
};
