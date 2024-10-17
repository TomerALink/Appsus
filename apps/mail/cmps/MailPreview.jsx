const { useState, useEffect } = React
import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onRemoveMail, onReadMail, onStaredMail }) {

    
    //TODO handel stars... add onclick for nav to MailDetails
    //TODO Renders the subject (with text size limit) 
    //TODO  Gives visual indication for read/unread   
    //TODO  Support hover state   
    
    const { subject, body, isRead, isStared, sentAt, from } = mail

    const isReadClass = isRead ? 'read' : 'unread'
    const envelope = isRead ? 'fa-solid fa-envelope-open' : 'fa-solid fa-envelope'
    
    return (
        <div className={`mail-preview ${isReadClass}`}>
            <span
                className={isStared ? "fa-solid fa-star star filled" : "fa-regular fa-star star"}
                onClick={(e) => {
                    
                    e.stopPropagation()
                    onStaredMail(mail.id)
                }}

                style={{ cursor: "pointer", fontSize: "1.5rem" }}
                
            >

            </span>

            <span>{from} </span>
            <span>{subject} </span>
            <span>{body} </span>
            <span className="send-at">{utilService.epochToDate(sentAt)} </span>

            <div className="buttons" >
                <a className={envelope} onClick={(e) => {
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

