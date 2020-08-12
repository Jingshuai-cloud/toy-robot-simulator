var Action = require("./Action");

const place = (position, command) => {
  let [positionX, positionY, facing] = position;

  moveAction = command.split(",");
  positionX = parseInt(moveAction[0].slice(-1));
  positionY = parseInt(moveAction[1]);
  facing = moveAction[2];

  if (isValidPosition(positionX, positionY)) {
    console.log(positionX, positionY, facing);
    return [positionX, positionY, facing];
  }
  return position;
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

// command = "LEFT" or "RIGHT"
const turn = (position, command) => {
  let [positionX, positionY, facing] = position;
  if (facing === "INITIAL") return position;

  const direction = {
    SOUTH: 0,
    EAST: 90,
    NORTH: 180,
    WEST: 270,
  };
  const turn = { LEFT: 90, RIGHT: 270 };

  let facingDegree = direction[facing];
  let commandDegree = turn[command];
  let newFacingDegree = facingDegree + commandDegree;

  newFacingDegree = newFacingDegree % 360;

  let newFacing = getKeyByValue(direction, newFacingDegree);
  console.log(positionX, positionY, newFacing);
  return [positionX, positionY, newFacing];
};

const move = (position) => {
  let [positionX, positionY, facing] = position;
  if (facing === "INITIAL") return position;

  const moveStep = {
    x: { SOUTH: 0, EAST: 1, NORTH: 0, WEST: -1 },
    y: { SOUTH: -1, EAST: 0, NORTH: 1, WEST: 0 },
  };
  positionX += moveStep.x[facing];
  positionY += moveStep.y[facing];

  if (isValidPosition(positionX, positionY)) {
    console.log(positionX, positionY, facing);
    return [positionX, positionY, facing];
  }
  return position;
};

const report = (position) => {
  console.log(position);
  return position;
};

const isValidPosition = (positionX, positionY) => {
  const boardRange = [0, 1, 2, 3, 4];
  if (boardRange.includes(positionX) || boardRange.includes(positionY)) {
    return true;
  }
  return false;
};

const allActions = () => {
  let action = new Action();
  action.setRobotAction("PLACE", place);
  action.setRobotAction("LEFT", turn);
  action.setRobotAction("RIGHT", turn);
  action.setRobotAction("MOVE", move);
  action.setRobotAction("REPORT", report);
  return action;
};

module.exports = {
  place,
  turn,
  move,
  report,
  allActions,
};
