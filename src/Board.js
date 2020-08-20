module.exports = class Board {
  constructor(initialSize) {
    const [x, y] = initialSize;
    this.boardRange = { X: x - 1, Y: y - 1 };
  }

  place(positionX, positionY) {
    let x = positionX;
    let y = positionY;
    x < 0 ? (x = 0) : x;
    y < 0 ? (y = 0) : y;
    x > this.boardRange.X ? (x = this.boardRange.X) : x;
    y > this.boardRange.Y ? (y = this.boardRange.Y) : y;
    return { X: x, Y: y };
  }
};
