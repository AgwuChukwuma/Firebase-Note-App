import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { db } from "./config/firebase-config";
import { getDocs , collection, addDoc, deleteDoc, doc } from "firebase/firestore";



function App() {
  const [notes, setNotes] = useState([]);
  const [showNotes, setShowNotes] = useState(true);

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
  const showSubmittedNotes = showNotes ? notes.filter((note) => note.isSubmited)
  : notes;



  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <button className="show" onClick={() => setShowNotes(!showNotes)}>
        {showNotes ? "Notes" : "Hide"}
      </button>
      {showSubmittedNotes.map((noteItem) => (
        <Note
          key={noteItem.id} // Using 'noteItem.id' instead of 'index'
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}


export default App;
