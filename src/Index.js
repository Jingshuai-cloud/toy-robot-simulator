const Command = require("./Components/Command.js");
const Robot = require("./Components/Robot.js");
const Board = require("./Components/Board.js");

const playGame = () => {
  const COMMAND_FILE = "./robotMoveCommand.txt";
  const ROBOT_INITIAL_POSITION = [0, 0, "INITIAL"];
  const BOARD_INITIAL_SIZE = [5, 5];

  const board = new Board(BOARD_INITIAL_SIZE);
  const robot = new Robot(ROBOT_INITIAL_POSITION, board);
  const commands = new Command(COMMAND_FILE).readUserCommand();

  commands.forEach((command) => {
    robot.execute(command);
    //console.log(robot.position);
  });
};

playGame();

module.exports = {
  playGame,
};
