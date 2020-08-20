module.exports = class Robot {
  constructor(initialPosition, board) {
    const [x, y, face] = initialPosition;
    this.position = { X: x, Y: y, facing: face };
    this.board = board;
  }

  place(command) {
    const moveAction = command.split(",");
    const newX = parseInt(moveAction[0].slice(-1));
    const newY = parseInt(moveAction[1]);
    const newFacing = moveAction[2];
    const newPosition = { X: newX, Y: newY, facing: newFacing };

    this.position = newPosition;
    return this.position;
  }

  // command = "LEFT" or "RIGHT"
  turn(direction) {
    const facing = this.position.facing;
    if (facing === "INITIAL") return this.position;

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
    if (facing === "INITIAL") return this.position;

    const nextStep = {
      NORTH: { X: 0, Y: 1 },
      EAST: { X: 1, Y: 0 },
      SOUTH: { X: 0, Y: -1 },
      WEST: { X: -1, Y: 0 },
    };

    const nextPosition = nextStep[facing];
    const newX = this.position.X + nextPosition.X;
    const newY = this.position.Y + nextPosition.Y;

    const boardPosition = this.board.place(newX, newY);

    this.position = {
      ...this.position,
      X: boardPosition.X,
      Y: boardPosition.Y,
    };

    return this.position;
  }

  report() {
    console.log(this.position);
    return this.position;
  }

  execute(command) {
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

      default:
        console.log("Wrong Command");
    }
  }
};
