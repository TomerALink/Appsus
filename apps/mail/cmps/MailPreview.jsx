
import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onRemoveMail, onReadMail }) {

    {/* <button onClick={() => onRemoveMail(mail.id)}>Remove</button> */ }
    const { subject, body, isRead, sentAt, from } = mail

    //TODO handel stars... add onclick for nav to MailDetails
    //TODO Renders the subject (with text size limit) 
    //TODO  Gives visual indication for read/unread   
    //TODO  Support hover state   


    const isReadClass = isRead ? 'read' : 'unread'
    return (
        <div className={`mail-preview ${isReadClass}`}>
            <span>★ </span>
            <span>{from} </span>
            <span>{subject} </span>
            <span>{body} </span>
            <span>{utilService.epochToDate(sentAt)} </span>
            <div className="buttons" >
                <a className="fa-solid fa-envelope-open"onClick={(e) => {
                    e.stopPropagation()
                    onReadMail(mail.id)
                }}>

                </a>
                <a className="fa-solid fa-trash" onClick={(e) => {
                    e.stopPropagation()
                    onRemoveMail(mail.id)
                }}>
                </a>
            </div>
        </div>
    )
}

