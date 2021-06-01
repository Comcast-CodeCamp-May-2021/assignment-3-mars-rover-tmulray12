class Rover {
   // Write code here!
   constructor(position) {
     this.position = position;
     this.mode = "NORMAL";
     this.generatorWatts = 110;
   }

  receiveMessage(message) {
  let response = {
    message: message.name,
    results:[]
  }
  for(let i = 0; i < message.commands.length; i++) { 
    response.results[i] = {completed: true};
    let roverStatus = {
      mode: this.mode,
      generatorWatts: this.generatorWatts,
      position: this.position
    }
    for(let command in message.commands) {
      if(message.commands[i].commandType === 'STATUS_CHECK') {
      response.results[i].completed = true;
      response.results[i].roverStatus = roverStatus;
    } else if(message.commands[i].commandType === 'MODE_CHANGE') {
      response.results[i].completed = true;
      if(message.commands[i].value === 'LOW_POWER') {
        this.mode = message.commands[i].value;
        roverStatus.mode = message.commands[i].value;
        response.results[i].roverStatus = roverStatus;
      } else {
        this.mode = message.commands[i].value;
        roverStatus.mode = this.mode;
        response.results[i].roverStatus = roverStatus;
      }
    } else {
      response.results[i].completed = true;
      if(this.mode === 'NORMAL') {
        this.position = message.commands[i].value;
        roverStatus.position = this.position;
        response.results[i].roverStatus = roverStatus;
      } else {
        response.results[i].completed = false;
      }
    }
  }
  }

  return response;
  }
}

module.exports = Rover;