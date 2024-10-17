import { noteService } from "../services/note.service.js"
import { NoteTxt, NoteImg, NoteVideo, NoteTodos } from "./NoteDynamicCmp.jsx"
const { useState } = React

export function NoteAdd({ renderList }) {
    const [note, setNote] = useState(noteService.getEmptyNote())

    function handleAdd({ target }) {
        const newNote = note

        const field = target.name
        const value = target.value
        // style
        if (field === 'style') {
            newNote.style.backgroundColor = value
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
        else setNote(prevCar => ({ ...prevCar, [field]: value }))
    }

    function onSaveNote() {
        const newNote = note
        if (newNote.type === 'NoteTxt') {
            newNote.info.txt = newNote.info.title
            newNote.info.title = ''
        }
        newNote.createAt = new Date()

        noteService.save(newNote)
            .then(newNote => {
                setNote(noteService.getEmptyNote())
                renderList()
            })
            .catch(err => {
                console.log('err: NoteAdd cannot operate onSaveNote', err)
            })
    }

    const newTitle = note.info.title || ''
    return (
        <section className="note-add">
            <input value={newTitle} onChange={handleAdd} type="text" name="title" id="title" placeholder="Take a note" />
            <button value={'NoteTxt'} className={note.type === 'NoteTxt' ? 'marked' : ''} onClick={handleAdd} name="type" >text</button>
            <button value={'NoteImg'} className={note.type === 'NoteImg' ? 'marked' : ''} onClick={handleAdd} name="type" >image</button>
            <button value={'NoteVideo'} className={note.type === 'NoteVideo' ? 'marked' : ''} onClick={handleAdd} name="type" >video</button>
            <button value={'NoteTodos'} className={note.type === 'NoteTodos' ? 'marked' : ''} onClick={handleAdd} name="type" >todos</button>
            <DynamicCmp note={note} handleChange={handleAdd} />
            <button disabled={!note.title} onClick={onSaveNote}>save</button>

        </section>
    )

}

function DynamicCmp(props) {
    switch (props.note.type) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteVideo':
            return <NoteVideo {...props} />
        case 'NoteTodo':
            return <NoteTodos {...props} />
    }
}
