import { useState } from "react";
import PropTypes from "prop-types";

function EditNote({ currentNote, onSave, onCancel }) {
    const [title, setTitle] = useState(currentNote.title);
    const [content, setContent] = useState(currentNote.content);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(currentNote.id, { title, content });
    };

    return (
        <div>
            <h2>Edit</h2>
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
                <button type="submit">Update</button>
                <button type="button" onClick={onCancel}>Cancel</button>
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
