import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../../../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef  } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailIndex() {


    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [isComposeVisible, setIsComposeVisible] = useState(false);


    useEffect(() => {
        setSearchParams(utilService.getTruthyValues(filterBy))
        loadMails()
    }, [ filterBy])


    function toggleCompose(){
        setIsComposeVisible(!isComposeVisible)
    }

    function onSendMail(mail){

        const updatedMail = { ...mail, sentAt: new Date() }
        mailService.save(updatedMail)
        .then(() => {
            setMails(prevMails => {
                const mailExists = prevMails.some(m => m.id === mail.id)

                if (mailExists) {
                    return prevMails.map(m => m.id === mail.id ? updatedMail : m)
                } else {
                    return [...prevMails, updatedMail]
                }
            });
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

    function onRemoveMail(mailId) {

        mailService.remove(mailId)
            .then(() => {
                setMails(mails =>
                    mails.filter(mail => mail.id !== mailId)
                )
            })
            .then(
                showSuccessMsg(`Mail removed secssesfuly!`)
            )
            .catch(err => {
                showErrorMsg(`Problems removing mail ${mailId}`)
                console.log('Problems removing mail:', err)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }



    function onReadMail(mailId) {

        const updatedMails = mails.map(mail => {

            if (mail.id === mailId) {
                mail.isRead = true

            }
            return mail
        })

        mailService.save(updatedMails.find(mail => mail.id === mailId))
        setMails(updatedMails)

    }

    function onStaredMail(mailId) {
       

        

        console.log('hhhh')
        const updatedMails = mails.map(mail => {

            if (mail.id === mailId) {
                mail.isStared = !mail.isStared

            }
            return mail
        })

        mailService.save(updatedMails.find(mail => mail.id === mailId))
        .then( ()=> {
            console.log(updatedMails)
            setMails(updatedMails)
    })

    }


    if (!mails) return <div>Loading...</div>
    return (

        <section className="mail-index">
            <div className="compose-filter-container">
            <nav>
            <button  onClick={toggleCompose} className="send-button">Compos</button>
            </nav>

            <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            </div>
            
            <div className="aside-main">
                 <nav className="side-menu">
                    <ul>
                        <li><i className="fa-solid fa-inbox"></i>Inbox <span>10</span></li>
                    
                        <li><i className="fa-regular fa-star"></i>Starred</li>
                    
                        <li><i className="fa-regular fa-paper-plane"></i>Sent</li>
                   
                        <li><i className="fa-regular fa-file"></i>Draft</li>
                    
                        <li><i className="fa-regular fa-trash"></i>Trash</li>
                    </ul>
                    
                </nav>
                <main>
  
                    <MailList toggleCompose={toggleCompose} isComposeVisible={isComposeVisible} onSendMail={onSendMail} onRemoveMail={onRemoveMail} onReadMail={onReadMail} onStaredMail={onStaredMail} mails={mails} />

                </main>
            </div>



        </section>


    )

}
