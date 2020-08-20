const Command = require("./Command.js");
const Robot = require("./Robot.js");
const Board = require("./Board.js");

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
