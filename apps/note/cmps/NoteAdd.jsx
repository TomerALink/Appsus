import { noteService } from "../services/note.service.js"
import { NoteTxt, NoteImg, NoteTodos } from "./NoteDynamicCmp.jsx"
const { useState } = React
const { useNavigate } = ReactRouterDOM

export function NoteAdd({ renderList, mailToNote }) {
    const [mail, setMail] = useState({ ...mailToNote })
    const condTxt = mail.body ? mail.body : mail.subject
    // maybe i should fix it too
    const cond = condTxt ? { ...noteService.getEmptyNote(), type: 'NoteTxt', info: { txt: condTxt } } : noteService.getEmptyNote()
    const [note, setNote] = useState(cond)
    const navigate = useNavigate()

    function handleAdd({ target }) {
        const newNote = note

        const field = target.name
        const value = target.value
        // style
        if (field === 'style') {
            setNote(prevNote => ({ ...prevNote, [field]: { backgroundColor: value } }))
        }
        // info-txt
        if (field === 'txt') {
            newNote.info.txt = value
            setNote(prevNote => ({ ...prevNote, ...newNote }))
        }
        //info-title
        if (field === 'title') {
            newNote.info.title = value
            setNote(prevNote => ({ ...prevNote, ...newNote }))
        }
        // info-url
        if (field === 'url') {
            newNote.info.url = value
            setNote(prevNote => ({ ...prevNote, ...newNote }))
        }
        // info-todos
        if (field === 'todos') {
            newNote.info.todos = value
            setNote(prevNote => ({ ...prevNote, ...newNote }))
        }
        // type
        if (field === 'type') {
            setInfoByType(value)
        }
    }

    function setInfoByType(type) {
        const newNote = note
        let txt
        let title
        let url
        let todos
        switch (type) {
            case 'NoteTxt':
                newNote.type = type
                txt = newNote.info.title ? newNote.info.title : ''
                newNote.info = { txt: txt }
                setNote(prevNote => ({ ...prevNote, ...newNote }))
                break
            case 'NoteImg':
                newNote.type = type
                title = newNote.info.title ? newNote.info.title : ''
                url = newNote.info.url ? newNote.info.url : ''
                newNote.info = { title: title, url: url }
                setNote(prevNote => ({ ...prevNote, ...newNote }))
                break
            case 'NoteTodos':
                newNote.type = type
                title = newNote.info.title ? newNote.info.title : ''
                todos = newNote.info.todos ? newNote.info.todos : []
                newNote.info = { title: title, todos: todos }
                setNote(prevNote => ({ ...prevNote, ...newNote }))
        }
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        setNote(prevNote => ({ ...prevNote, createAt: Date.now() }))
        noteService.save(note)
            .then(note => {
                renderList()
                setNote(prevNote => ({ ...prevNote, ...noteService.getEmptyNote() }))
                if (mailToNote) {
                    navigate("/note")
                }
            })
            .catch(err => {
                console.log('err: NoteAdd cannot operate onSaveNote', err)
            })
    }

    const newTitle = note.info.title || ''
    const newColor = note.style.backgroundColor || "#ffffff"
    return (
        <section className="note-add">
            <form className="note-add-form" onSubmit={onSaveNote}>
                <div className="note-add-start">
                    <input type='text' disabled={note.type === 'NoteTxt'} value={newTitle} onChange={handleAdd} name="title" id="title" placeholder="Take a note" />
                    <div className='note-add-button'>
                        <button type='button' value={'NoteTxt'} className={`fa-solid fa-pen ${note.type === 'NoteTxt' ? 'marked' : ''}`} onClick={handleAdd} name="type"></button>
                        <button type='button' value={'NoteImg'} className={`fa-solid fa-image ${note.type === 'NoteImg' ? 'marked' : ''}`} onClick={handleAdd} name="type"></button>
                        <button type='button' value={'NoteTodos'} className={`fa-solid fa-list ${note.type === 'NoteTodos' ? 'marked' : ''}`} onClick={handleAdd} name="type" ></button>
                    </div>
                </div>
                <div className="note-add-content">
                    <DynamicCmp note={note} handleAdd={handleAdd} />
                </div>
                <div className="note-add-finish">
                    <input type='color' disabled={!note.type} value={newColor} onChange={handleAdd} name="style" id="style" list="colors" />
                    <datalist id="colors">
                        <option value="#ffffff">white</option>
                        <option value="#eea29a">pink</option>
                        <option value="#b5e7a0">green</option>
                        <option value="#ffef96">yellow</option>
                        <option value="#f2ae72">orange</option>
                        <option value="#80ced6">blue</option>
                        <option value="#b0aac0">purple</option>
                        <option value="#dac292">brown</option>
                        <option value="#b2c2bf">grey</option>
                        <option value="#fff2df">cream</option>
                    </datalist>
                    <button type='submit' disabled={!note.type} className="fa-solid fa-bookmark"></button>
                </div>
            </form>
        </section>
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
