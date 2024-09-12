import PropTypes from "prop-types";

function Note(props) {
  
  const truncate =(text, wordLimit) =>{
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice (0, wordLimit).join(' ') + "..." : text;
  };

  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    props.onEdit(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{truncate(props.content, 20)}</p>

      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>DELETE</button>
      <p className="timestamp">{props.timestamp}</p>
    </div>
  );
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Note;
