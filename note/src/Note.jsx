import PropTypes from "prop-types"

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }
  function del(){
    props.onEdit(props.id);
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={del}>Edit</button>
      <button onClick={handleClick}>DELETE</button>
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