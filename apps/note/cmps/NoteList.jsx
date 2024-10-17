const { Link } = ReactRouterDOM
import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes, onRemoveNote }) {

    return (
        <React.Fragment>
            <ul className="note-list">
                {notes.map(note =>
                    <li key={note.id}>
                        <NotePreview note={note} />
                        <section>
                            <button onClick={() => onPinNote(note.id)}>Pin</button>
                            <button onClick={() => onColorNote(note.id)}>Color</button>
                            <button onClick={() => onSendNote(note.id)}>Send</button>
                            <button ><Link to={`/note/edit/${note.id}`}>Edit</Link></button>
                            <button onClick={() => onRemoveNote(note.id)}>Remove</button>
                        </section>
                    </li>
                )}
            </ul>
        </React.Fragment>
    )

}