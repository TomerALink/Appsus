

const {useNavigate } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx"
import { MailCompose } from "./MailCompose.jsx"

const { useState, useEffect } = React

export function MailList({ onSendMail, mails, onRemoveMail, onReadMail, onStaredMail, isComposeVisible, toggleCompose }) {
    const navigate = useNavigate()
    const [sortedMails, setSortedMails] = useState(mails)
    const [sortingDiraction, setSortingDiraction] = useState(-1)

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
                return setSortedMails(mails.sort((a, b) => (new Date(a.sentAt) - new Date(b.sentAt))*sortingDiraction))
            case 'subject':
                return setSortedMails(mails.sort((a, b) => a.subject.localeCompare(b.subject) * sortingDiraction))
        }
    }

    return (
        <React.Fragment>
                <div className="sorting">
                    <button onClick={() => onSortBy('date')}>Date</button>
                    <button onClick={() => onSortBy('subject')}>Subject</button>
                </div>
            <ul className="mail-list">
                {mails.map(mail =>
                    <li key={mail.id}>
                        {mail.id}
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
