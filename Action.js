class Action {
  constructor() {
    this.robotAction = {};
  }
  setRobotAction(command, action) {
    this.robotAction[command] = action;
  }
  getRobotAction(command) {
    return this.robotAction[command];
  }
}
module.exports = Action;
