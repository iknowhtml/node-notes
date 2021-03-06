console.log('Starting notes.js');
const fs = require('fs');

const fetchNotes = () => {
    try {
      const notesString = fs.readFileSync('notes-data.json');
      return JSON.parse(notesString);
    } catch (error) {
      return [];
    }
}

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

const addNote = (title, body) => {
  let notes = fetchNotes();
  const note = {
    title,
    body
  };

  const duplicateNotes = notes.filter((note) => {
    return note.title === title
  });

  if(duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => {
  return fetchNotes();
};

const readNote = title => {
  const notes = fetchNotes();
  return notes.filter(note => note.title === title)[0];
};

const removeNote = title => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);
  return filteredNotes.length !== notes.length;
};

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote
};
