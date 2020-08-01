commando helps you create the short versions of your long, boring terminal commands.  
It is a productivity tool for developers and sys. admins.

## install the script globally
```sh
npm install -g .
```
To uninstall the script run  
```sh
npm uninstall -g hello-cli
```
### create a new short command
```sh
$ commando create
Enter your full command : ${yourlongcommand} (Ex : flutter emulators --launch my-emulator)
Enter your short command : ${yourshortcommand} (Ex : runemu)
```
### execute your short command
```sh
$ commando ${yourshortcommand}
```
### get a spesific short command***
```sh
$ commando get ${yourshortcommand}
```
### list all commands
```sh
$ commando all
```

