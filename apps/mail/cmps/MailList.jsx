

const { useNavigate } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx"
import { mailService } from "../services/mail.service.js"
import { Accordion } from "../cmps/Accordion.jsx"
import { MailDetails } from "../cmps/MailDetails.jsx"

const { useState, useEffect } = React

export function MailList({ setSortedMails, mails, onRemoveMail, onReadMail, onStaredMail, filterBy, onDelete }) {
    const navigate = useNavigate()
    
    const [sortingDiraction, setSortingDiraction] = useState(-1)
    const [dateClass, setDateClass] = useState('')
    const [subjectClass, setSubjectClass] = useState('')



    // useEffect(() => {
    //     setSortedMails(mails)
    // }, [sortedMails, onDelete])
    // useEffect(() => {
    //     // setSortedMails(mails)
    // }, [setSortedMails, onDelete])

    function onNavToMailDetails(id) {
        //TODO
        navigate(`/mail/${id}`)
    }

    function onSortBy(value = 'all') {
        
        setSortingDiraction(prevSortingDiraction => prevSortingDiraction * -1)

        switch (value) {
            case 'date':
                setDateClass(sortingDiraction === 1 ? 'fa-rotate-180' : '')
                return setSortedMails(mails.sort((a, b) => (new Date(a.sentAt) - new Date(b.sentAt)) * sortingDiraction))
            case 'subject':
                setSubjectClass(sortingDiraction === 1 ? 'fa-rotate-180' : '')
                return setSortedMails(mails.sort((a, b) => a.subject.localeCompare(b.subject) * sortingDiraction))
        }
    }

    function onEmptyTrashCan() {
        onDelete()
        console.log('onDelete')
    }





    return (
        <React.Fragment>
            <div className="sorting">
                <button onClick={() => onSortBy('date')}> <i className={`fa-solid fa-angle-down ${dateClass}`}></i> Date</button>
                <button onClick={() => onSortBy('subject')}><i className={`fa-solid fa-angle-down ${subjectClass}`}></i>  Subject</button>
            </div>
            {filterBy.status === 'trash' && <button className="empty-trash-can" onClick={() => onEmptyTrashCan()}><i className="fa-solid fa-trash"></i> Empty trash can</button>}
            <ul className="mail-list">
                {mails.map(mail =>
                    <li key={mail.id}>
                                <Accordion  mail={mail} onRemoveMail={onRemoveMail} onReadMail={onReadMail} onStaredMail={onStaredMail} >
                                  <MailDetails mailId ={mail.id}>
                                      mail.body
                                  </MailDetails>
                                </Accordion>
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
}
