import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Note(props) {
  
  const [timestamp, setTimestamp] = useState("");
  
  const truncate =(text, wordLimit) =>{
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice (0, wordLimit).join(' ') + "...." : text;
  };

  useEffect(() => {

 
    setTimestamp(new Date().toLocaleString());
  }, []);

  function handleClick() {
    props.onDelete(props.id);
  }

  function del() {
    setTimestamp(new Date().toLocaleString());
    props.onEdit(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{truncate(props.content, 20)}</p>

      <button onClick={del}>Edit</button>
      <button onClick={handleClick}>DELETE</button>
      <p className="timestamp">{timestamp}</p>
    </div>
  );
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Note;
