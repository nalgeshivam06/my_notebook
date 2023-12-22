import React, { useState } from 'react';
import noteContext from './noteContext';
// import { json } from 'express';
// //import { json } from 'express';

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial);

   // Get all notes
   const getNotes = async() => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'auth-token':localStorage.getItem('token')
      }
    });
    const json= await response.json()
    setnotes(json)

  }
  
  
  // Add a note
  const addNote = async(title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Accept': 'application/json',
        'auth-token':localStorage.getItem('token')
      },

      body: JSON.stringify({title,description,tag})
    });

    console.log("adding new note");
    const note =  await response.json();
    setnotes(notes.concat(note));

  }

  // Delete a note
  const deleteNote = async (id) => {
    // api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'auth-token':localStorage.getItem('token')
      },
    });
    
    const json= response.json();
    console.log(json)

    console.log("deleting note with id " + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes);

  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'auth-token':localStorage.getItem('token')
      },

      body: JSON.stringify({title,description,tag}) 
    });
    // const json= await response.json();
    // console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
  //logic to edit in client
  for (let index = 0; index < newNotes.length;
     index++) {
    const element = newNotes[index];
    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
    

  }
  setnotes(newNotes);

}

return (
  <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes, }}>
    {props.children}
  </noteContext.Provider>


)

}

export default NoteState;