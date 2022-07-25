//=================RESOURCES================//
//https://www.geeksforgeeks.org/node-js-yargs-module/
//https://yargs.js.org/docs/

//=========================npm modules========================//
//==========Chalk===========//
const chalk = require("chalk");
//==========yargs===========//
//const { hideBin } = require("yargs/helpers");
const yargs = require("yargs/yargs")(process.argv.slice(2));
const argv = yargs.argv;
//=========================my modules========================//
const { getNotes, addNote , removeNote } = require("./notes.js");
/*********************************************************/
/*********************************************************/
/*
const command = process.argv[2];
if (command === "add") {
    console.log(chalk.green.inverse.bold("Adding Note!"));
} else if (command === "remove") {
    console.log(chalk.red.inverse.bold("Removing Note!"));
}
*/

/*
console.log(process.argv);
console.log(yargs.argv)
*/

//=============Customize yargs version=============//
yargs.version("1.1.0");
//yargs.showVersion('log');

//=============Create add command=============//

yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true, // by default it's set to false
            type: "string", // by default it's set to boolean
        },
        body: {
            describe: "Note description",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        addNote(argv.title, argv.body);
    },
});

//=============Create remove command=============//
yargs.command({
    command: "remove",
    describe: "Remove the note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        removeNote(argv.title);
    },
});
//=============Create list command=============//
yargs.command({
    command: "list",
    describe: "listing all the notes",
    handler(argv) {
        console.log("Listing all notes");
    },
});
//=============Create read command=============//
yargs.command({
    command: "read",
    describe: "Reading a note",
    handler() {
        console.log("Reading a note");
    },
});
//=============Parsing commands=============//
yargs.parse();
