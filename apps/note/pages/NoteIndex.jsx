import { NoteList } from "../cmps/NoteList.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [mailParams, setMailParams] = useSearchParams()

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes =>
                    notes.filter(note => note.id !== noteId)
                )
            })
            .then(
                showSuccessMsg(`Note removed successfully!`)
            )
            .catch(err => {
                showErrorMsg(`Problems removing note ${noteId}`)
                console.log('Problems removing note:', err)
            })
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteAdd renderList={loadNotes} mailToNote={noteService.getContentFromSearchParams(mailParams)} />
            <NoteList onRemoveNote={onRemoveNote} notes={notes} />
        </section>
    )

}