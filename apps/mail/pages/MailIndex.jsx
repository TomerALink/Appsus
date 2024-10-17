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
    const [unfilterd, setUnfilterd] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [isComposeVisible, setIsComposeVisible] = useState(false)


    useEffect(() => {
        setSearchParams(utilService.getTruthyValues(filterBy))
        // console.log(filterBy)
        loadMails()
    }, [filterBy])

    useEffect(() => {
        setUnfilterd(mails)
    }, [mails])

    // function onSetFilter(){

    // }


    function toggleCompose() {
        setIsComposeVisible(prevComposeVisible => !prevComposeVisible)
    }

    function onSendMail(mail) {

        const updatedMail = { ...mail, sentAt: new Date() }
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
            .finally(() => {
                toggleCompose()
            }
            )
    }

    function loadMails() {
        console.log("loading")
        mailService.query(filterBy)
            .then(setMails)
            .catch(err => {
                console.log('err:', err)
            })

    }

    // function onRemoveMail(mailId) {//TODO use for delete

    //     mailService.remove(mailId)
    //         .then(() => {
    //             setMails(mails =>
    //                 mails.filter(mail => mail.id !== mailId)
    //             )
    //         })
    //         .then(
    //             showSuccessMsg(`Mail removed secssesfuly!`)
    //         )
    //         .catch(err => {
    //             showErrorMsg(`Problems removing mail ${mailId}`)
    //             console.log('Problems removing mail:', err)
    //         })
    // }

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
                <nav>
                    <button onClick={toggleCompose} className="send-button"><i className="fa-solid fa-pencil"></i>Compos</button>
                </nav>

                <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            </div>

            <div className="aside-main">
                <MailFolderList activeFilter={filterBy.status} mails={unfilterd} onSetFilter={onSetFilter} />

                <main>
                    {mails.length > 0 ? (
                        <MailList

                            toggleCompose={toggleCompose}
                            isComposeVisible={isComposeVisible}
                            onSendMail={onSendMail}
                            onRemoveMail={onRemoveMail}
                            onReadMail={onReadMail}
                            onStaredMail={onStaredMail}
                            mails={mails}
                        />

                    ) : (
                        <div>Loading...</div>
                    )}

                </main>
            </div>



        </section>


    )

}
