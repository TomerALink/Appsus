

const {useNavigate } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx"
import { MailCompose } from "./MailCompose.jsx"

export function MailList({onSendMail, mails, onRemoveMail, onReadMail, onStaredMail, isComposeVisible, toggleCompose }) {
    
    const navigate = useNavigate()

    function onNavToMailDetails(id) {
        navigate(`/mail/${id}`)
    }
    return (
        <React.Fragment>
            
            <ul className="mail-list">
                {mails.map(mail =>
                    <li key={mail.id}>
                        {mail.id}
                        <div onClick={() => onNavToMailDetails(mail.id)}>

                            <MailPreview mail={mail} onRemoveMail={onRemoveMail} onReadMail={onReadMail} onStaredMail={onStaredMail}/>
                        </div>
                    </li>
                )}
            </ul>
            {isComposeVisible && <MailCompose toggleCompose={toggleCompose} onSendMail={onSendMail}/>}
 
        </React.Fragment>
    )
}
