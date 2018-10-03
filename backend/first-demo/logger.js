const EventEmitter = require('events');

class Logger extends EventEmitter {

    log(message) {
        console.log(message);
        this.emit('user_logged');
    }
    
}

module.exports = Logger;