const fs = require("fs");
const chalk = require("chalk");
const getNotes = (note) => {
    return `Your notes is ${note}`;
};

const addNote = (title, body) => {
    const notes = loadNotes(); // array of javascript objects
    const duplicateNote = notes.find((note) => note.title === title);
    if (!duplicateNote) { // (duplicateNote === undefined)
        const js = { title, body }; //javascript object
        notes.push(js); //javascript array
        saveNotes(notes);
        console.log(chalk.green.inverse.bold("New note added !"));
    } else {
        console.log(chalk.red.inverse.bold("This Note title already exists!"));
    }
};
const removeNote = (title) => {
    const notes = loadNotes();
    const updatedNotes = notes.filter((note) => note.title !== title);
    if (updatedNotes.length < notes.length) {
        console.log(chalk.green.inverse.bold(`The ${title} Note removed!`));
        saveNotes(updatedNotes);
    } else {
        console.log(chalk.red.inverse.bold("No Note found with this title"));
    }
};
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green.inverse.bold("Your Notes are :"));
    for (let note of notes) {
        console.log(note.title);
    } //notes.forEach(note => console.log(note.title));
};
const readNote = (title) => {
    const notes = loadNotes();
    const matchedNote = notes.find((note) => note.title === title);
    if (matchedNote) {
        console.log(
            chalk.green.inverse.bold(`Note ( ${matchedNote.title} ) : `)+
            matchedNote.body + '.'
        );
    } else {
        console.log(
            chalk.red.inverse.bold(`No notes found with title ( ${title} ).`)
        );
    }
};
const saveNotes = (notes) => {
    const json = JSON.stringify(notes); // javascript object or array => json
    fs.writeFileSync("notes.json", json);
};
const loadNotes = () => {
    try {
        const bufferin = fs.readFileSync("notes.json");
        const jsonin = bufferin.toString(); // array of json
        return JSON.parse(jsonin); // array of javascript objects
    } catch (e) {
        return [];
    }
};

/***********************************************/
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};
/***********************************************/
