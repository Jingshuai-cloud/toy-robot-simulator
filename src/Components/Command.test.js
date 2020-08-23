const Command = require("./Command.js");
const TEST_FILE = "./testCommand.txt";
const command = new Command(TEST_FILE);

it("should run the constructor correctly", () => {
  expect(command.commandFile).toBe("./testCommand.txt");
});

it("should transfer user command txt file to array correctly", () => {
  const commandOutputArray = [
    "MOVE",
    "LEFT",
    "RIGHT",
    "PLACE 3,4,WEST",
    "MOVE",
    "REPORT",
  ];
  expect(command.readUserCommand()).toStrictEqual(commandOutputArray);
});
