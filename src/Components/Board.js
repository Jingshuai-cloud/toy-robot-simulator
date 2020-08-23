module.exports = class Board {
  constructor(initialSize) {
    const [x, y] = initialSize;
    this.boardRange = { X: x - 1, Y: y - 1 };
  }

  //check whether position status is valid
  isBoradPositionValid(newX, newY) {
    return (
      newX >= 0 &&
      newX <= this.boardRange.X &&
      newY >= 0 &&
      newY <= this.boardRange.Y
    );
  }
};
