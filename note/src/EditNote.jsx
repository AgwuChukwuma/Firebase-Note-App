import { useState } from "react";
import PropTypes from "prop-types";
import Footer from "./Footer";

function EditNote({
    currentNote,
    onSave,   
    onCancel  
}) {
    const [title, setTitle] = useState(currentNote.title);
    const [content, setContent] = useState(currentNote.content);


    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(currentNote.id, { title, content });
    };

    
    const handleCancel = () => {
        onCancel(); 
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
            <Footer/>
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
