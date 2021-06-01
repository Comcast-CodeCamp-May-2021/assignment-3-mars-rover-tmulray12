const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
      let rover = new Rover(98382);
      expect(rover.position).toEqual(98382);
      expect(rover.mode).toEqual("NORMAL");
      expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual("Test message with two commands");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(commands.length);
  });

  it("responds correctly to status check command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 444)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.mode).toEqual("LOW_POWER");
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[3].roverStatus.position).toEqual(444);
  });

  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 666)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(response.results[0].roverStatus.mode).toEqual('LOW_POWER');
    expect(response.results[3].roverStatus.mode).toEqual('NORMAL');
  });

it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 87382098)];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(87382098); 
  let response = rover.receiveMessage(message);
  expect(response.results[0].completed).toEqual(true);
  expect(response.results[2].roverStatus.position).toEqual(87382098);
});

it("responds with position for move command", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE'), new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 20)];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(87382098); 
  let response = rover.receiveMessage(message);
  if(message.commands[3].commandType === "MOVE") {
    expect(response.results[3].roverStatus.position).toEqual(20)};
  if(message.commands[1].commandType === "MOVE"){
    expect(response.results[1].completed).toEqual(false)}
})

});
