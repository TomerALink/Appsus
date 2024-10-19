import { makeId } from '../../../services/util.service.js'
import { loadFromStorage, saveToStorage } from '../../../services/storage.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { hc_notes } from './notes.js'

const NOTE_KEY = 'noteDN'

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getContentFromSearchParams,
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            // if (filterBy.txt) {
            //     const regExp = new RegExp(filterBy.txt, 'i')
            //     notes = notes.filter(note => regExp.test(note.vendor))
            // }
            // if (filterBy.minSpeed) {
            //     notes = notes.filter(note => note.speed >= filterBy.minSpeed)
            // }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(id, createdAt = Date.now(), type = '', style = { backgroundColor: '#ffffff' }, info = {}) {
    return { id, createdAt, type, style, info }
}
function _createNotes() {
    console.log('_createNotes')
    let notes = loadFromStorage(NOTE_KEY)

    if (!notes || !notes.length) {

        notes =
            hc_notes.map(note =>
                _createNote(note)
            )

        saveToStorage(NOTE_KEY, notes)
    }
    console.log(notes)
}


function _createNote(newNote) {
    const { id, createdAt, type, style, info } = newNote
    const note = getEmptyNote(id, createdAt, type, style, info)
    console.log(note)
    if (!id) note.id = makeId()

    return note
}

function getContentFromSearchParams(searchParams) {
    const subject = searchParams.get('subject') || ''
    const body = searchParams.get('body') || ''
    return {
        subject,
        body
    }
}