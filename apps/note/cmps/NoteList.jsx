const { useNavigate } = ReactRouterDOM
import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes, onRemoveNote }) {

    const navigate = useNavigate()

    function onSendNote(note) {
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
            case 'NoteTodos':
                let todoList = note.info.todos.map((todo, idx) => `${(idx)} - ${todo.txt} - ${todo.doneAt ? 'DONE' : 'IN PROGRESS'}`)
                // console.log(todoList)
                // 1 - dfds fdsf cdff sdsds sdsd  - DONE , 2 - df dfdfdf  dfdfdf? ddf - IN PROGRESS , 3 - fffg
                // pay attention to signs: ' , ? ! [] (). i am not sure how they are converted back to text
                todoList = todoList.join(' , ')
                subject = note.info.title
                body = todoList
        }
        navigate(`/mail?status=inbox&subject=${subject}&body=${body}`)
    }

    return (
        <React.Fragment>
            <ul className="note-list">
                {notes.map(note =>
                    <li key={note.id} className="note-content" style={note.style}>
                        <NotePreview note={note} />
                        <section className="note-btn">
                            <button onClick={() => onSendNote(note)} name="send" className="fa-solid fa-paper-plane"></button>
                            <button onClick={() => onRemoveNote(note.id)} name="delete" className="fa-solid fa-trash-can"></button>
                        </section>
                    </li>
                )}
            </ul>
        </React.Fragment>
    )

}