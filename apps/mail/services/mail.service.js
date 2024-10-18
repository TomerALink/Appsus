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
            if (filterBy.status) {
                switch (filterBy.status) {
                    case 'inbox':
                        mails = mails.filter(mail => mail.to === loggedinUser.email && !mail.isDeleted)
                        break
        
                    case 'starred':
                        mails = mails.filter(mail => mail.isStared === true && !mail.isDeleted)
                        break
        
                    case 'sent':
                        mails = mails.filter(mail => mail.from === loggedinUser.email && !mail.isDeleted)
                        break
        
                    case 'draft'://TBD
                        filterBy = {}
                        break
        
                    case 'trash':
                        mails = mails.filter(mail => mail.isDeleted === true)
                        break
                }
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
    return { 
        status: 'inbox', //sent/trash/draft', 
        txt: '', // no need to support complex text search
        
        //isRead: true,   // (optional property, if missing: show all) 
        //isStared: true, // (optional property, if missing: show all) 
        //lables: ['important', 'romantic'] // has any of the labels //TODO
        } 
 
}

function getEmptyMail(id, createdAt = Date.now(), subject = '', body = '', isRead = false, isStared = false, isDeleted= false, sentAt = Date.now(), removedAt =  Date.now(), from = '', to = '') {
    return { id, createdAt, subject, body, isRead, isStared, isDeleted, sentAt, removedAt, from, to }
}

function _createMail(newMail) {
    const { id, createdAt, subject, body, isRead, isStared, isDeleted, sentAt, removedAt, from, to } = newMail
    const mail = getEmptyMail(id, createdAt, subject, body, isRead, isStared, isDeleted, sentAt, removedAt, from, to)
    
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
    // console.log(mails)
}



function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const status = searchParams.get('status')  || ''//'inbox'

    return {
        txt,
        status
    }
}
