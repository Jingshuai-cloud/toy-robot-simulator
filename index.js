const readRobertMoveData = (robertMoveDataTxtFile) => {
  let fs = require("fs");
  let moveDataArray = fs
    .readFileSync(robertMoveDataTxtFile, "utf8")
    .toString()
    .split("\n");
  console.log(moveDataArray);

  return moveDataArray;
};

const generatePositionArray = () => {
  let positionArray = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      positionArray.push([i, j]);
    }
  }
  console.log(positionArray);
};

const validRobotPosition = (index) => {
  if (index < 0 || index > 4) {
    return false;
  }
  return true;
};

const currentSituation = (moveDataArray) => {
  let robotPosition = [];
  let moveSetp = [];
  let indexX = 0;
  let indexY = 0;
  let robotFace = "";
  for (let i = 0; i < moveDataArray.length; i++) {
    if (moveDataArray[i].includes("PLACE")) {
      moveSetp = moveDataArray[i].split(",");
      indexX = parseInt(moveSetp[0].slice(-1));
      indexY = parseInt(moveSetp[1]);
      robotFace = moveSetp[2];
      if (validRobotPosition(indexX) && validRobotPosition(indexY)) {
        robotPosition = [indexX, indexY, robotFace];
      }
      console.log(robotPosition);
    }

    if (moveDataArray[i].includes("LEFT")) {
      let newFace = "";
      const direction = ["NORTH", "WEST", "SOUTH", "EAST", "NORTH"];
      for (let i = 0; i < direction.length; i++) {
        if (robotFace === direction[i]) {
          newFace = direction[i + 1];
        }
      }
      robotFace = newFace;
      if (validRobotPosition(indexX) && validRobotPosition(indexY)) {
        robotPosition = [indexX, indexY, robotFace];
      }
      console.log(robotPosition);
    }

    if (moveDataArray[i].includes("RIGHT")) {
      let newFace = "";
      const direction = ["NORTH", "EAST", "SOUTH", "WEST", "NORTH"];
      for (let i = 0; i < direction.length; i++) {
        if (robotFace === direction[i]) {
          newFace = direction[i + 1];
        }
      }
      robotFace = newFace;
      if (validRobotPosition(indexX) && validRobotPosition(indexY)) {
        robotPosition = [indexX, indexY, robotFace];
      }
      console.log(robotPosition);
    }

    if (moveDataArray[i].includes("MOVE")) {
      if (robotFace === "NORTH") {
        indexY += 1;
      }
      if (robotFace === "SOUTH") {
        indexY -= 1;
      }
      if (robotFace === "WEST") {
        indexX -= 1;
      }
      if (robotFace === "EAST") {
        indexX += 1;
      }
      if (validRobotPosition(indexX) && validRobotPosition(indexY)) {
        robotPosition = [indexX, indexY, robotFace];
      }

      console.log(robotPosition);
    }
  }
};

const array = readRobertMoveData("./robertMoveData.txt");
currentSituation(array);
