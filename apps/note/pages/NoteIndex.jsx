// import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { getTruthyValues } from "../../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        // setSearchParams(getTruthyValues(filterBy))
        loadNotes()
        // }, [filterBy])
    }, [])

    function loadNotes() {
        // mailService.query(filterBy)
        noteService.query()
            .then(setNotes)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setMails(notes =>
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

    // function onSetFilter(filterByToEdit) {
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    // }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            {/* <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} />*/}
            <NoteList onRemoveMail={onRemoveNote} notes={notes} />

        </section>
    )

}