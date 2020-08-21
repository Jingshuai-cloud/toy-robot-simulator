module.exports = class Board {
  constructor(initialSize) {
    const [x, y] = initialSize;
    this.boardRange = { X: x - 1, Y: y - 1 };
    this.robot;
  }

  //check whether position status is valid
  getPositionStatus(position, index) {
    let result = "INVALID";
    if (position >= 0 && position <= this.boardRange[index]) {
      result = "VALID";
    }
    return result;
  }
};
