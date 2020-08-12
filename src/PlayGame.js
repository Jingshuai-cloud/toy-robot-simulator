const { place, turn, move, report } = require("./Robot");

const readCommand = (robotCommandTxtFile) => {
  let fs = require("fs");
  let moveCommandArray = fs
    .readFileSync(robotCommandTxtFile, "utf8")
    .toString()
    .split("\n");
  console.log(moveCommandArray);

  return moveCommandArray;
};

const getAllActions = () => {
  let allActions = {};
  allActions["PLACE"] = place;
  allActions["LEFT"] = turn;
  allActions["RIGHT"] = turn;
  allActions["MOVE"] = move;
  allActions["REPORT"] = report;
  return allActions;
};

const readCommandAndTakeActions = (moveCommand) => {
  const allActions = getAllActions();
  let position = ["INITIAL", "INITIAL", "INITIAL"];

  for (let i = 0; i < moveCommand.length; i++) {
    let command = moveCommand[i].split(" ")[0];
    let action = allActions[command];
    try {
      position = action(position, moveCommand[i]);
    } catch (error) {
      console.log("invalid step");
    }
  }
};

const robotCommand = readCommand("./robotMoveCommand.txt");
readCommandAndTakeActions(robotCommand);
