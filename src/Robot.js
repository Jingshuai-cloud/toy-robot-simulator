module.exports = class Robot {
  constructor(initialPosition, board) {
    const [x, y, initialFace] = initialPosition;
    this.initialFace = initialFace;
    this.position = { X: x, Y: y, facing: initialFace };
    this.board = board;
  }

  place(command) {
    //split command to [place, 3, 4, NORTH]
    const moveAction = command.split(",");
    const newX = parseInt(moveAction[0].slice(-1));
    const newY = parseInt(moveAction[1]);
    const newFacing = moveAction[2];
    const newPosition = { X: newX, Y: newY, facing: newFacing };

    //check with board whether position is valid
    if (this.checkPosition(newX, newY)) {
      this.position = newPosition;
    }

    return this.position;
  }

  // command = "LEFT" or "RIGHT"
  turn(direction) {
    const facing = this.position.facing;
    if (facing === this.initialFace) return this.position;

    const index = {
      RIGHT: 0,
      LEFT: 1,
    };

    const turnIndex = index[direction];

    const nextFace = {
      NORTH: ["EAST", "WEST"],
      EAST: ["SOUTH", "NORTH"],
      SOUTH: ["WEST", "EAST"],
      WEST: ["NORTH", "SOUTH"],
    };

    const newFacing = nextFace[facing][turnIndex];

    this.position = {
      ...this.position,
      facing: newFacing,
    };

    return this.position;
  }

  move() {
    const facing = this.position.facing;
    if (facing === this.initialFace) return this.position;

    const nextStep = {
      NORTH: { X: 0, Y: 1 },
      EAST: { X: 1, Y: 0 },
      SOUTH: { X: 0, Y: -1 },
      WEST: { X: -1, Y: 0 },
    };

    //caculate the next step
    const nextPosition = nextStep[facing];
    const newX = this.position.X + nextPosition.X;
    const newY = this.position.Y + nextPosition.Y;

    //check with board whether position is valid
    if (this.checkPosition(newX, newY)) {
      this.position = {
        ...this.position,
        X: newX,
        Y: newY,
      };
    }

    return this.position;
  }

  report() {
    console.log(this.position);
    return this.position;
  }

  checkPosition(newX, newY) {
    const checkX = this.board.getPositionStatus(newX, "X");
    const checkY = this.board.getPositionStatus(newY, "Y");
    if (checkX === "VALID" && checkY === "VALID") {
      return true;
    }
    console.log("NOT MOVING, WILL FAILING");
    return false;
  }

  execute(command) {
    //Get PLACE from PLACE 3,4,NORTH Command
    let commandFirstWord = command.split(" ")[0];

    switch (commandFirstWord) {
      case "PLACE":
        this.place(command);
        break;

      case "MOVE":
        this.move();
        break;

      case "LEFT":
      case "RIGHT":
        this.turn(command);
        break;

      case "REPORT":
        this.report();
        break;
      //Wrong Command
      default:
        console.log("Wrong Command");
    }
  }
};
