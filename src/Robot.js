const robotInitialFacing = "INITIAL";

const place = (position, command) => {
  moveAction = command.split(",");
  position.positionX = parseInt(moveAction[0].slice(-1));
  position.positionY = parseInt(moveAction[1]);
  position.facing = moveAction[2];

  console.log(position);
  return position;
};

// command = "LEFT" or "RIGHT"
const turn = (position, command) => {
  if (position.facing === robotInitialFacing) return position;
  const direction = {
    SOUTH: 0,
    EAST: 90,
    NORTH: 180,
    WEST: 270,
  };

  const turn = { LEFT: 90, RIGHT: 270 };

  let facingDegree = direction[position.facing];
  let commandDegree = turn[command];
  let newFacingDegree = facingDegree + commandDegree;

  newFacingDegree = newFacingDegree % 360;
  let newFacing = getKeyByValue(direction, newFacingDegree);
  position.facing = newFacing;
  console.log(position);
  return position;
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

const move = (position) => {
  if (position.facing === robotInitialFacing) return position;

  const moveStep = {
    x: { SOUTH: 0, EAST: 1, NORTH: 0, WEST: -1 },
    y: { SOUTH: -1, EAST: 0, NORTH: 1, WEST: 0 },
  };
  position.positionX += moveStep.x[position.facing];
  position.positionY += moveStep.y[position.facing];
  console.log(position);
  return position;
};

const report = (position) => {
  console.log(position);
  return position;
};

const getAllRobotActions = () => {
  let allActions = {};
  allActions["PLACE"] = place;
  allActions["LEFT"] = turn;
  allActions["RIGHT"] = turn;
  allActions["MOVE"] = move;
  allActions["REPORT"] = report;
  return allActions;
};

module.exports = {
  getAllRobotActions,
};
