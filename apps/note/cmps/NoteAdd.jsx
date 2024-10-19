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
        console.log('1 target', field, value)
        // style
        if (field === 'style') {
            newNote.style.backgroundColor = value
            console.log('1 style', note.style)
            setNote(newNote)
            console.log('2 style', note.style)
        }
        // info-txt
        if (field === 'txt') {
            newNote.info.txt = value
            console.log('1 txt', note.info.txt)
            setNote(newNote)
            console.log('2 txt', note.info.txt)
        }
        //info-title
        if (field === 'title') {
            newNote.info.title = value
            console.log('1 title', note.info.title)
            setNote(newNote)
            console.log('2 title', note.info.title)
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
        // type
        if (field === 'type') {
            // newNote.type = value
            // setNote(newNote)
            setNoteByType(value)
        }
    }

    function setNoteByType(type) {
        const newNote = note
        switch (type) {
            case 'NoteTxt':
                newNote.type = type
                const txt = newNote.info.title ? newNote.info.title : ''
                newNote.info = { txt: txt }
                setNote(newNote)
                break
            case 'NoteImg':
                newNote.type = type
                let title = newNote.info.title ? newNote.info.title : ''
                const url = newNote.info.url ? newNote.info.url : ''
                newNote.info = { title: title, url: url }
                setNote(newNote)
                break
            case 'NoteTodos':
                newNote.type = type
                title = newNote.info.title ? newNote.info.title : ''
                const todos = newNote.info.todos ? newNote.info.todos : []
                newNote.info = { title: title, todos: todos }
                setNote(newNote)
        }
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
    // const newColor = note.style.backgroundColor || "#ffffff"
    console.log('1 All', newTitle)
    console.log('2 All', note.info.txt)
    return (
        <form className="note-select-type-title" onSubmit={onSaveNote}>
            <input type='text' disabled={note.type === 'NoteTxt'} value={newTitle} onChange={handleAdd} name="title" id="title" placeholder="Take a note" />
            <button type='button' value={'NoteTxt'} className={note.type === 'NoteTxt' ? 'marked' : ''} onClick={handleAdd} name="type" >text</button>
            <button type='button' value={'NoteImg'} className={note.type === 'NoteImg' ? 'marked' : ''} onClick={handleAdd} name="type" >image</button>
            <button type='button' value={'NoteTodos'} className={note.type === 'NoteTodos' ? 'marked' : ''} onClick={handleAdd} name="type" >todos</button>
            <div className="note-select-content">
                <DynamicCmp note={note} handleAdd={handleAdd} />
            </div>
            {/* <input type='color' disabled={!note.type} value={newColor} onChange={handleAdd} name="style" id="style" list="colors" />
            <datalist id="colors">
                <option value="#cccccc">Grey</option>
                <option value="#ffffff">White</option>
                <option value="#6699cc">Blue</option>
            </datalist> */}
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
