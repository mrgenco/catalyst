# catalyst
a productivity tool for your terminal commands.

**Still under development**

## Example usage
cd -> src

### create a new short command
```sh
$ node cli create
Enter your full command : flutter emulators --launch my-emulator
Enter your short command : startmyemu
```
### execute your short command
```sh
$ node cli startmyemu
```
### get a spesific short command***
```sh
$ node cli get ${shortcommand}
```
### list all commands
```sh
$ node cli all
```

