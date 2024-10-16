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
        else setNote(prevCar => ({ ...prevCar, [field]: value }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        const newNote = note
        newNote.createAt = new Date()

        noteService.save(newNote)
            .then(newNote => {
                renderList()
                setNote(noteService.getEmptyNote())
            })
            .catch(err => {
                console.log('err: NoteAdd cannot operate onSaveNote', err)
            })
    }
    // console.log('NoteAdd')
    const newTitle = note.info.title || ''
    return (
        <form className="note-add" onSubmit={onSaveNote}>
            <input disabled={note.type === 'NoteTxt'} value={newTitle} onChange={handleAdd} type="text" name="title" id="title" placeholder="Take a note" />
            <button type='button' value={'NoteTxt'} className={note.type === 'NoteTxt' ? 'marked' : ''} onClick={handleAdd} name="type" >text</button>
            <button type='button' value={'NoteImg'} className={note.type === 'NoteImg' ? 'marked' : ''} onClick={handleAdd} name="type" >image</button>
            <button type='button' value={'NoteVideo'} className={note.type === 'NoteVideo' ? 'marked' : ''} onClick={handleAdd} name="type" >video</button>
            <button type='button' value={'NoteTodos'} className={note.type === 'NoteTodos' ? 'marked' : ''} onClick={handleAdd} name="type" >todos</button>
            <div className="note-content">
                <DynamicCmp note={note} handleAdd={handleAdd} />
            </div>
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
        case 'NoteVideo':
            return <NoteVideo {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
    }
}
