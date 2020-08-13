const { readUserCommand } = require("./Command");
const { robotWalkInBoad } = require("./Board");

const userCommand = readUserCommand("./robotMoveCommand.txt");
robotWalkInBoad(userCommand);
