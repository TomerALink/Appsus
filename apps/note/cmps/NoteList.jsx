const { Link } = ReactRouterDOM
import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes, onRemoveNote }) {

    function convertNoteToMail(note) {
        let subject
        let body

        switch (note.type) {
            case 'NoteTxt':
                let date = new Date(note.createdAt)
                date = date.toLocaleDateString('en-US')
                subject = `A Note created at ${date}`
                body = note.info.txt
                break
            case 'NoteImg':
                subject = note.info.title
                body = `Watch the image in the following link:\n ${note.info.url}`
                break
            case 'NoteVideo':
                subject = note.info.title
                body = `Watch the video in the following link:\n ${note.info.url}`
                break
            case 'NoteTodos':
                let todoList = note.info.todos.map(todo => `* ${todo.txt}`)
                todoList = todoList.join('\n')
                subject = note.info.title
                body = todoList
        }
        return { subject, body }
    }

    return (
        <React.Fragment>
            <ul className="note-list">
                {notes.map(note => {
                    const { subject, body } = convertNoteToMail(note)
                    console.log(subject)
                    console.log(body)
                    return (
                        <li key={note.id}>
                            <NotePreview note={note} />
                            <section>
                                <button onClick={() => onColorNote(note.id)}>Color</button>
                                {/* <button onClick={() => onSendNote(note.id)}>Send</button> */}
                                <button ><Link to={`/mail?status=inbox&subject=${subject}&body=${body}`}>Send</Link></button>
                                <button ><Link to={`/note/edit/${note.id}`}>Edit</Link></button>
                                <button onClick={() => onRemoveNote(note.id)}>Remove</button>
                            </section>
                        </li>
                    )
                }
                )}
            </ul>
        </React.Fragment>
    )

}