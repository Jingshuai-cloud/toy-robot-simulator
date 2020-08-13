const { robotActions } = require("./Robot");
const robotInitialFacing = "INITIAL";

const robotWalkInBoad = (moveCommand) => {
  //const allActions = getAllRobotActions();
  let position = { positionX: 0, positionY: 0, facing: robotInitialFacing };
  let newPosition = { positionX: 0, positionY: 0, facing: robotInitialFacing };

  for (let i = 0; i < moveCommand.length; i++) {
    let command = moveCommand[i].split(" ")[0];
    let action = robotActions[command];

    try {
      newPosition = action(position, moveCommand[i]);
    } catch (error) {
      console.log("invalid step");
    }

    if (isValidPosition(newPosition)) {
      position = newPosition;
    }
  }
  return position;
};

const isValidPosition = (newPosition) => {
  const boardRange = [0, 1, 2, 3, 4];
  if (
    boardRange.includes(newPosition.positionX) ||
    boardRange.includes(newPosition.positionY)
  ) {
    return true;
  }
  return false;
};

module.exports = {
  robotWalkInBoad,
};
