import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "https://nestjstraining-production.up.railway.app"
  const notesInitial = []
  const [Notes, setNotes] = useState(notesInitial)

  // Get all Note
  const getNotes = async () => {
    try {

      // console.log(localStorage.getItem('token'))
      const response = await fetch(`${host}/notes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`

        },
        body: JSON.stringify()
      });
      const json = await response.json();
      // console.log(json)
      setNotes(json);
    } catch (error) {
      localStorage.removeItem('token');

    }
  }


  // Add Note
  const addNote = async (title, description) => {
    // TODO API Call
    try {
      const response = await fetch(`${host}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, description })
      });
      const note = await response.json();
      setNotes(Notes.concat(note))

    } catch (error) {
      localStorage.removeItem('token');

    }

  }

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const json = await response.json();
      // console.log(json)

      const newNotes = Notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)

    } catch (error) {
      localStorage.removeItem('token');

    }
  }


  // Edit a Note
  const editNote = async (id, title, description) => {

    // API call
    try {
      const response = await fetch(`${host}/notes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, description })
      });
      const json = await response.json();
      // console.log(json)

      let newNotes = JSON.parse(JSON.stringify(Notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          break;
        }

      }
      setNotes(newNotes);

    } catch (error) {
      localStorage.removeItem('token');

    }

  }

  return (
    <NoteContext.Provider value={{ Notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;