import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"
import { MailCompose } from "../cmps/MailCompose.jsx"


const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function MailIndex() {


    const [mails, setMails] = useState([])
    const [unfilterd, setUnfilterd] = useState(mails)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getValuesFromSearchParams(searchParams))
    const [isComposeVisible, setIsComposeVisible] = useState(false)
    const [mailFromNote, setMailFromNote] = useState(mailService.getValuesFromSearchParams(searchParams))
    const [sortedMails, setSortedMails] = useState(mails)


    useEffect(() => {
        setSearchParams(utilService.getTruthyValues(filterBy))
        if (mailFromNote.subject || mailFromNote.body) setIsComposeVisible(true)
        loadMails()
    }, [filterBy])


    useEffect(() => {
        mailService.query()
            .then(setUnfilterd)
            .catch(err => {
                console.log('err:', err)
            })
            mailService.query(filterBy)
                    .then(setSortedMails)
                    .catch(err => {
                        console.log('err:', err)
                    })
    }, [mails])



    function toggleCompose() {
        setIsComposeVisible(prevComposeVisible => !prevComposeVisible)
    }

    function onSendMail(mail) {

        _sendMail(mail)

        toggleCompose()

    }

    function _sendMail(mail) {
        const updatedMail = { ...mail, sentAt: Math.floor(Date.now()) }

        mailService.save(updatedMail)
            .then((savedMail) => {
                return mailService.query(filterBy)
            })
            .then((mails) => {
                setMails(mails)
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


    }

    function onDelete() {

        console.log('onDelete')
        // Filter mails to delete
        const deletedMails = mails.filter(mail => mail.isDeleted)

        if (deletedMails.length === 0) {
            console.log("No mails to delete.")
            return; // Exit if there are no mails to delete
        }

        mailService.removeAll(deletedMails)
        // // Create an array of promises for deleting each mail
        // const deletePromises = deletedMails.map(mail => mailService.remove(mail.id));

        // // Use Promise.all to wait for all deletions to complete
        // Promise.all(deletePromises)
        //     .then(() => {
        //         // After deletion, we can query the mails to refresh the state
        //         return mailService.query(filterBy);
        //     })
        //     .then((updatedMails) => {
        //         // Set the mails to the state after querying
        //         setMails(updatedMails);
        //     })
        //     .catch(error => {
        //         console.error("Failed to delete some mails:", error);
        //         // Handle any errors that occurred during deletion
        //     });
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
        console.log('onRemoveMail', mailId)
        const updatedMails = mails.map(mail => {

            if (mail.id === mailId) {
                return { ...mail, isDeleted: !mail.isDeleted }
            }
            return mail
        })

        mailService.save(updatedMails.find(mail => mail.id === mailId))
            .then(() => {
                setMails(updatedMails)
                setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
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
                            setSortedMails={setSortedMails}
                            filterBy={filterBy}
                            onSendMail={onSendMail}
                            onRemoveMail={onRemoveMail}
                            onReadMail={onReadMail}
                            onStaredMail={onStaredMail}
                            mails={mails}
                            onDelete={onDelete}
                        />
                    ) : (
                        <div>
                            You have no emails...</div>
                    )}
                        {isComposeVisible && <MailCompose toggleCompose={toggleCompose} onSendMail={onSendMail}/>}
                </main>
            </div>

        </section>


    )

}
