import { useState } from "react";
import PropTypes from "prop-types";

function EditNote({
    currentNote, // the note being edited
    onSave,     // function to call when saving the edited note
    onCancel    // function to call when canceling the edit
}) {
    const [title, setTitle] = useState(currentNote.title);
    const [content, setContent] = useState(currentNote.content);

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(currentNote.id, { title, content }); // Save edited note
    };

    // Function to handle cancel action
    const handleCancel = () => {
        onCancel(); // Notify parent component that editing has been canceled
    };

    return (
        <div>
            <h2>Edit Note</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    value={content}
                    placeholder="Content"
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit" className="submit">Update</button>
                <button
                    type="button"
                    className="submit-cancel"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

EditNote.propTypes = {
    currentNote: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default EditNote;
