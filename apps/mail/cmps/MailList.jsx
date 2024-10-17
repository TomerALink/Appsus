

const {useNavigate } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx"
import { MailCompose } from "./MailCompose.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailList({ onSendMail, mails, onRemoveMail, onReadMail, onStaredMail, isComposeVisible,filterBy, toggleCompose, onDelete }) {
    const navigate = useNavigate()
    const [sortedMails, setSortedMails] = useState(mails)
    const [sortingDiraction, setSortingDiraction] = useState(-1)
    const [dateClass, setDateClass] = useState('')
    const [subjectClass, setSubjectClass] = useState('')

    

    useEffect(() => {
        setSortedMails(mails)
    }, [sortedMails])

    function onNavToMailDetails(id) {
        navigate(`/mail/${id}`)
    }

    function onSortBy(value='all'){
        console.log(sortingDiraction)
        setSortingDiraction(prevSortingDiraction => prevSortingDiraction*-1)

            switch(value){
            case 'date':
                setDateClass(sortingDiraction === 1 ?  'fa-rotate-180' : '')
                return setSortedMails(mails.sort((a, b) => (new Date(a.sentAt) - new Date(b.sentAt))*sortingDiraction))
            case 'subject':
                setSubjectClass(sortingDiraction === 1 ?  'fa-rotate-180' : '')
                return setSortedMails(mails.sort((a, b) => a.subject.localeCompare(b.subject) * sortingDiraction))
        }
    }

    function onEmptyTrashCan(){
        onDelete()
        console.log('onDelete')
    }

    
   

    
    return (
        <React.Fragment>
                <div className="sorting">
                    <button onClick={() => onSortBy('date')}> <i className={`fa-solid fa-angle-down ${dateClass}`}></i> Date</button>
                    <button onClick={() => onSortBy('subject')}><i className={`fa-solid fa-angle-down ${subjectClass}`}></i>  Subject</button>
                </div>
               {filterBy.status==='trash' && <button className="empty-trash-can" onClick={() => onEmptyTrashCan()}><i className="fa-solid fa-trash"></i> Empty trash can</button>}
            <ul className="mail-list">
                {mails.map(mail =>
                    <li key={mail.id}>
                        {/* {mail.id} */}
                        <div onClick={() => onNavToMailDetails(mail.id)}>

                            <MailPreview mail={mail} onRemoveMail={onRemoveMail} onReadMail={onReadMail} onStaredMail={onStaredMail} />
                        </div>
                    </li>
                )}
            </ul>
            {isComposeVisible && <MailCompose toggleCompose={toggleCompose} onSendMail={onSendMail} />}
        </React.Fragment>
    )
}
