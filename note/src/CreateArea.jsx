import { useState } from "react";
import PropTypes from "prop-types"


function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  
  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
        <button className="new">+</button>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>✔</button>
      </form>
    </div>
  );
}
CreateArea.propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

export default CreateArea;
