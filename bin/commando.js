#!/usr/bin/env node

const prompt = require('prompt-sync')({ sigint: true });
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('commandos.json')
const db = low(adapter)
const { exec } = require("child_process");

// Set some defaults (required if your JSON file is empty)
db.defaults({ commandos: [] }).write()

var args = process.argv.slice(2);

switch (args[0]) {
    case 'create':
        create();
        break;
    case 'all':
        all();
        break;
    case 'get':
        get(args[1]);
        break;
    default:
        execute(args[0]);
}

function create() {
    const fullCommand = prompt('Enter a full commando :');
    const shortCommand = prompt('Enter a short commando :');
    // Add a command
    db.get('commandos').push({
        fullCommand: fullCommand,
        shortCommand: shortCommand
    }).write()
    console.log('new short command added! : ' + shortCommand);
}

function all() {
    const result = db.get('commandos').value();
    console.log(result);
}

function get(command) {
    const result = db.get('commandos').find({ shortCommand: command }).value();
    console.log(result);
}

function execute(command) {
    const result = db.get('commandos').find({ shortCommand: command }).value();
    if (result === undefined)
        console.log('There is no predefined commando called : ' + command);
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