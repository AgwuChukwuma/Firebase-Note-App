import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import EditNote from "./EditNote";
import { db } from "./config/firebase-config";
import { getDocs , collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";



function App() {
  const [notes, setNotes] = useState([]);
  const [showNotes, setShowNotes] = useState(true);
  const [editingNote, setEditingNote] = useState(null)

  const notesCollectionRef = collection(db, "note");

  useEffect(() =>{
    const getNotes = async () =>{

      try{
      const data = await getDocs(notesCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setNotes(filteredData);
      }catch (err){
        console.error(err)
      }
    };
    getNotes();
},[]);

  const addNote = async (newNote) => {
    try{
    const docRef = await addDoc(notesCollectionRef, newNote);
    setNotes((prevNotes) => [...prevNotes, {...newNote, id: docRef.id}]);
  }catch(err){
    console.error(err);
  }
  };

  const deleteNote = async (id) => {
    try{
    const noteDoc = doc(db, "note", id);
    await deleteDoc(noteDoc);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }catch(err){
    console.error(err);
  }
  };

  const updateNote = async (id, updatedNote) =>{
    try{
          const noteDoc = doc(db, "note", id)
    await updateDoc(noteDoc, updatedNote)
    setNotes((prevNotes) =>
       prevNotes.map((note) => (note.id === id ? {...note, ...updatedNote} : note)));
    setEditingNote(null)
    }
    catch(err){
      console.error(err)
    }
  };

  const handleEdit = (id) =>{
    const noteToEdit = notes.find((note) => note.id === id);
    setEditingNote(noteToEdit);
    setShowNotes(false);
  };

  const cancelEdit = () =>{
    setEditingNote(null);
  }

  const showSubmittedNotes = showNotes ? notes.filter((note) => note.isSubmited)
  : notes;

  return (
    <div>
      <Header />
      <button className="show" onClick={() => setShowNotes(!showNotes)}>
        {showNotes ? "Notes" : "Hide"}
     </button>  
    {showNotes ? (
          <>
          <CreateArea onAdd={addNote} />
      {editingNote && (
              <EditNote currentNote={editingNote}
              onSave={updateNote}
              onCancel={cancelEdit} />
      )}
      {showSubmittedNotes.map((noteItem) => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onEdit ={handleEdit}
        />
      ))}
          </>
    ) : (
      <>
      {notes.map ((noteItem) => (
        <Note
        key={noteItem.id}
        id={noteItem.id}
        title={noteItem.title}
        content={noteItem.content}
        onDelete={deleteNote}
        onEdit ={handleEdit}
        />
      ))}
      </>
    )}
      <Footer />
    </div>
  );
}


export default App;
