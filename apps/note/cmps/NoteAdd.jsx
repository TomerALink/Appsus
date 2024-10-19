import { noteService } from "../services/note.service.js"
import { NoteTxt, NoteImg, NoteTodos } from "./NoteDynamicCmp.jsx"
const { useState } = React
const { useNavigate } = ReactRouterDOM

export function NoteAdd({ renderList, mailToNote }) {
    const [mail, setMail] = useState({ ...mailToNote })
    const condTxt = mail.body ? mail.body : mail.subject
    const cond = condTxt ? { ...noteService.getEmptyNote(), type: 'NoteTxt', info: { txt: condTxt } } : noteService.getEmptyNote()
    const [note, setNote] = useState(cond)
    const navigate = useNavigate()

    function handleAdd({ target }) {
        const newNote = note

        const field = target.name
        const value = target.value
        // style
        if (field === 'style') {
            newNote.style.backgroundColor = value
            setNote(newNote)
        }
        // info-txt
        if (field === 'txt') {
            newNote.info.txt = value
            setNote(newNote)
        }
        //info-title
        if (field === 'title') {
            newNote.info.title = value
            setNote(newNote)
        }
        // info-url
        if (field === 'url') {
            newNote.info.url = value
            setNote(newNote)
        }
        // info-todos
        if (field === 'todos') {
            newNote.info.todos = value
            setNote(newNote)
        }
        // type, isPinned
        else setNote(prevNote => ({ ...prevNote, [field]: value }))
    }

    function onColorNote() {

    }

    function onSaveNote(ev) {
        ev.preventDefault()
        const newNote = note
        newNote.createAt = Date.now()

        noteService.save(newNote)
            .then(newNote => {
                renderList()
                setNote(noteService.getEmptyNote())
                if (mailToNote) {
                    navigate("/note")
                }
            })
            .catch(err => {
                console.log('err: NoteAdd cannot operate onSaveNote', err)
            })
    }

    const newTitle = note.info.title || ''
    return (
        <form className="note-select-type-title" onSubmit={onSaveNote}>
            <input disabled={note.type === 'NoteTxt'} value={newTitle} onChange={handleAdd} type="text" name="title" id="title" placeholder="Take a note" />
            <button type='button' value={'NoteTxt'} className={note.type === 'NoteTxt' ? 'marked' : ''} onClick={handleAdd} name="type" >text</button>
            <button type='button' value={'NoteImg'} className={note.type === 'NoteImg' ? 'marked' : ''} onClick={handleAdd} name="type" >image</button>
            <button type='button' value={'NoteTodos'} className={note.type === 'NoteTodos' ? 'marked' : ''} onClick={handleAdd} name="type" >todos</button>
            <div className="note-select-content">
                <DynamicCmp note={note} handleAdd={handleAdd} />
            </div>
            <button type='button' onClick={() => onColorNote(note.title.backgroundColor)}>color</button>
            <button type='submit' disabled={!note.type} >save</button>
        </form>
    )

}

function DynamicCmp(props) {
    switch (props.note.type) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
    }
}
