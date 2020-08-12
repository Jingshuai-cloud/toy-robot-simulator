const { readRobotMoveData } = require("./ReadData");
const { place, turn, move, report } = require("./Robot");
const Action = require("./Action");

const allActions = () => {
  let action = new Action();
  action.setRobotAction("PLACE", place);
  action.setRobotAction("LEFT", turn);
  action.setRobotAction("RIGHT", turn);
  action.setRobotAction("MOVE", move);
  action.setRobotAction("REPORT", report);
  return action;
};

const currentSituation = (moveData) => {
  const allAction = allActions();

  let position = ["INITIAL", "INITIAL", "INITIAL"];

  for (let i = 0; i < moveData.length; i++) {
    let command = moveData[i].split(" ")[0];
    let action = allAction.getRobotAction(command);
    try {
      position = action(position, moveData[i]);
    } catch (error) {
      console.log("invalid step");
    }
  }
};

const robotMoveData = readRobotMoveData("./robotMoveData.txt");
currentSituation(robotMoveData);

module.exports = {
  readRobotMoveData,
};
