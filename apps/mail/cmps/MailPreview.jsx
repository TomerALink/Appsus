const { useState, useEffect } = React
import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onRemoveMail, onReadMail, onStaredMail }) {

    
    //TODO handel stars... add onclick for nav to MailDetails
    //TODO Renders the subject (with text size limit) 
    //TODO  Gives visual indication for read/unread   
    //TODO  Support hover state   
    
    const { subject, body, isRead, isStared, sentAt, from } = mail

    const isReadClass = isRead ? 'read' : 'unread'
    return (
        <div className={`mail-preview ${isReadClass}`}>
            <span
                className={isStared ? "star filled" : "star"}
                onClick={(e) => {
                    console.log(isStared)
                    e.stopPropagation()
                    onStaredMail(mail.id)
                }}

                style={{ cursor: "pointer", fontSize: "2rem" }}
                
            >
                ★
            </span>

            <span>{from} </span>
            <span>{subject} </span>
            <span>{body} </span>
            <span>{utilService.epochToDate(sentAt)} </span>
            <div className="buttons" >
                <a className="fa-solid fa-envelope-open" onClick={(e) => {
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

