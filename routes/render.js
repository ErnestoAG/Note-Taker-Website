const notes = require('express').Router();
const array = require('../db/db.json');
var ID = Number(array[array.length - 1].id) + 1;
const {
  readFilePromise, 
  writingFile, 
  readAppend
} = require('../util/tools');

notes.get('/', (req, res) => {
  readFilePromise('./db/db.json', "utf8").then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    const { title, text} = req.body;
    
    if (req.body) {
      const newNote = {
        id: JSON.stringify(ID++),
        title,
        text
      };
  
      readAppend(newNote, './db/db.json');
      res.json("Note added successfully");
    } else {
      res.error("Error in adding note");
    }

});

notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFilePromise('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);

      writingFile('./db/db.json', result);

      res.json(`Selected note has been deleted`);
    });
});
  
  module.exports = notes;