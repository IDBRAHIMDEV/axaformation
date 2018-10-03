//const logger = require('./logger');
const os = require('os');
const fs = require('fs');

const Logger = require('./logger');
const path = require('path');

function sayHello(name) {
    console.log(`my name is: ${ name }`);
}

const logger = new Logger();

//register event
logger.on('user_logged', function() {
    console.log('listener called...');
})

logger.log('salam Axa');


//sayHello('Mohamed IDBRAHIM')

//logger("salam zakaria")

// const files = fs.readdir('./', function(err, files) {
   
//     if(err) console.log('error: ', err.message);
//     else console.log('files: ', files);

// });
//console.log('my Files: ', files);
// console.log('total memory: ', os.totalmem());
// console.log('free memory: ', os.freemem());
// console.log('Networking: ', os.networkInterfaces())
//console.log(path.parse(__filename));
//console.log("chemin absolu: " + __filename);
//console.log("le repertoire: ", __dirname);