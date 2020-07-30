const prompt = require('prompt-sync')({ sigint: true });
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('commands.json')
const db = low(adapter)
const { exec } = require("child_process");

// Set some defaults (required if your JSON file is empty)
db.defaults({ commands: [] }).write()

var args = process.argv.slice(2);

switch (args[0]) {
    case 'create':
        create();
        console.log('create method is called');
        break;
    case 'all':
        all();
        console.log('all method is called');
        break;
    case 'get':
        get(args[1]);
        console.log('get method is called');
        break;
    default:
        execute(args[0]);
        console.log('execute method is called');
}

function create() {
    const fullCommand = prompt('Enter your full command :');
    const shortCommand = prompt('Enter your short command :');
    // Add a command
    db.get('commands').push({
        fullCommand: fullCommand,
        shortCommand: shortCommand
    }).write()
    console.log('new short command added! : ' + shortCommand);
}

function all() {
    const result = db.get('commands').value();
    console.log(result);
}

function get(command) {
    const result = db.get('commands').find({ shortCommand: command }).value();
    console.log(result);
}

function execute(command) {
    const result = db.get('commands').find({ shortCommand: command }).value();
    if (result === undefined)
        console.log('There is no predefined command called : ' + command);
    else {
        exec(result.fullCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(stdout);
        });
    }
}