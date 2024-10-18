import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"



const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function MailIndex() {


    const [mails, setMails] = useState([])
    const [unfilterd, setUnfilterd] = useState(mails)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getValuesFromSearchParams(searchParams))
    const [isComposeVisible, setIsComposeVisible] = useState(false)
    const [mailFromNote, setMailFromNote] = useState(mailService.getValuesFromSearchParams(searchParams))


    useEffect(() => {
        setSearchParams(utilService.getTruthyValues(filterBy))
        if(mailFromNote.subject || mailFromNote.body) setIsComposeVisible(true)
        loadMails()
    }, [filterBy])





    function toggleCompose() {
        setIsComposeVisible(prevComposeVisible => !prevComposeVisible)
    }

    function onSendMail(mail) {

        _sendMail(mail)
           
                toggleCompose()
           
    }

   function _sendMail(mail){
    const updatedMail = { ...mail, sentAt:  Math.floor(Date.now()) }
    mailService.save(updatedMail)
        .then((savedMail) => {
            setMails(prevMails => {
                const mailExists = prevMails.some(m => m.id === mail.id)

                if (mailExists) {
                    return prevMails.map(m => m.id === mail.id ? updatedMail : m)
                } else {
                    return [...prevMails, savedMail]
                }
            })
        })
        .catch(error => {
            console.error("Failed to save mail:", error)
        })
   }


    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
            .catch(err => {
                console.log('err:', err)
            })

        mailService.query()
            .then(setUnfilterd)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onDelete() {

        const mailsToDelete = mails.filter(mail => mail.isDeleted)

        if (!mailsToDelete.length) {
            console.log('No mails to delete')
            return
        }

        const deletePromises = mailsToDelete.map(mail => {
            return mailService.remove(mail.id)
                .then(() => {
                    console.log(`Mail with id ${mail.id} was removed`)
                })
                .catch(err => {
                    console.log('Problem removing mail', err)
                })
        })

        Promise.all(deletePromises)
            .then(() => {
                return mailService.query(filterBy)
            })
            .then((updatedMails) => {
                setMails(updatedMails)
            })
            .catch(err => {
                console.log('Problem fetching updated mails', err)
            })
    }


    function onSetFilter(filterBy) {
        if (filterBy.status === 'inbox') {
            setFilterBy({ ...mailService.getDefaultFilter(), ...filterBy })
        }
        else {
            setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        }
    }

    function onRemoveMail(mailId) {

        const updatedMails = mails.map(mail => {

            if (mail.id === mailId) {
                return { ...mail, isDeleted: !mail.isDeleted }
            }
            return mail
        })

        mailService.save(updatedMails.find(mail => mail.id === mailId))
            .then(() => {
                setMails(updatedMails)
            })
            .catch(err => {
                console.log('Problem saving mail', err)
            })
    }


    function onReadMail(mailId) {

        const updatedMails = mails.map(mail => {

            if (mail.id === mailId) {
                return { ...mail, isRead: !mail.isRead }
            }
            return mail
        })

        mailService.save(updatedMails.find(mail => mail.id === mailId))
            .then(() => {
                setMails(updatedMails)
            })
            .catch(err => {
                console.log('Problem saving mail', err)
            })
    }


    function onStaredMail(mailId) {

        const updatedMails = mails.map(mail => {

            if (mail.id === mailId) {
                return { ...mail, isStared: !mail.isStared }
            }
            return mail
        })

        mailService.save(updatedMails.find(mail => mail.id === mailId))
            .then(() => {
                setMails(updatedMails)
            })
            .catch(err => {
                console.log('Problem saving mail', err)
            })
    }


    if (!mails) return <div>Loading...</div>
    return (

        <section className="mail-index">
            <div className="compose-filter-container">
                <div className="logo-compose">
                    <img src="./assets/img/logo.png" className="mail-logo" />
                    <nav>
                        <button onClick={toggleCompose} className="compos-button"><i className="fa-solid fa-pencil"></i>Compos</button>
                    </nav>
                </div>

                <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            </div>

            <div className="aside-main">
                <MailFolderList
                    filterBy={filterBy}
                    activeFilter={filterBy.status}
                    unfilterd={unfilterd}
                    onSetFilter={onSetFilter}
                />

                <main className="main-container">
                    {mails.length > 0 ? (
                        <MailList
                            filterBy={filterBy}
                            toggleCompose={toggleCompose}
                            isComposeVisible={isComposeVisible}
                            onSendMail={onSendMail}
                            onRemoveMail={onRemoveMail}
                            onReadMail={onReadMail}
                            onStaredMail={onStaredMail}
                            mails={mails}
                            onDelete={onDelete}
                        />
                    ) : (
                        <div>Loading...</div>
                    )}

                </main>
            </div>

        </section>


    )

}
