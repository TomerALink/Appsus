import { makeId } from '../../services/util.service.js'
import { loadFromStorage, saveToStorage } from '../../services/storage.service.js'
import { storageService } from '../../services/async-storage.service.js'
import { hc_notes } from '../notes.js'

const NOTE_KEY = 'noteDN'

_createNotes()

export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    // getDefaultFilter,
    // getFilterFromSearchParams,
    // add,
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
    return storageService.get(NOTE_KEY, noteId).then(_setNextPrevNoteId)
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

// function add(note) {
//     return storageService.post(NOTE_KEY, note)
// }

// function getDefaultFilter() {
//     return { txt: '', minSpeed: '' }
// }


function getEmptyNote(id, createdAt = new Date(), type = '', isPinned = false, style = { backgroundColor: '#00d' }, info = { txt: 'Fullstack Me Baby!' }) {
    return { id, createdAt, type, isPinned, style, info }
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
    const { id, createdAt, type, isPinned, style, info } = newNote
    const note = getEmptyNote(id, createdAt, type, isPinned, style, info)
    console.log(note)
    if (!id) note.id = makeId()

    return note
}