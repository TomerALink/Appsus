import { makeId } from '../../../services/util.service.js'
import { loadFromStorage, saveToStorage } from '../../../services/storage.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { hc_mails } from './mails.js'

const MAIL_KEY = 'mailDN'


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    // add,
    getFilterFromSearchParams,
    loggedinUser
}

_createMails()


function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => (regExp.test(mail.subject) || regExp.test(mail.body) || regExp.test(mail.from) || regExp.test(mail.to)))
            }
            if (filterBy.stared) {
                mails = mails.filter(mail => mail.isStared === true)
            }
            if (filterBy.unread) {
                mails = mails.filter(mail => mail.isRead === false)
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}


function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

// function add(mail) {
//     return storageService.post(MAIL_KEY, mail)
// }

function getDefaultFilter() {
    // return { txt: '', price: '' }
    return { txt: '' }
}

function getEmptyMail(id, createdAt = new Date, subject = '', body = '', isRead = false, isStared = false, sentAt = new Date, removedAt = new Date, from = '', to = '') {
    return { id, createdAt, subject, body, isRead, isStared, sentAt, removedAt, from, to }
}

function _createMail(newMail) {
    const { id, createdAt, subject, body, isRead, isStared, sentAt, removedAt, from, to } = newMail
    const mail = getEmptyMail(id, createdAt, subject, body, isRead, isStared, sentAt, removedAt, from, to)
    console.log(mail)
    if (!id) mail.id = makeId()

    return mail
}


function _createMails() {

    let mails = loadFromStorage(MAIL_KEY)

    if (!mails || !mails.length) {

        mails =
            hc_mails.map(mail =>
                _createMail(mail)
            )

        saveToStorage(MAIL_KEY, mails)
    }
    console.log(mails)
}


// function _setNextPrevMailId(mail) {
//     return query().then((mails) => {
//         const mailIdx = mails.findIndex((currmail) => currmail.id === mail.id)
//         const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
//         const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
//         mail.nextMailId = nextMail.id
//         mail.prevMailId = prevMail.id
//         return mail
//     })
// }





function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    // const price = searchParams.get('price') || ''
    return {
        txt,
        // price
    }
}
