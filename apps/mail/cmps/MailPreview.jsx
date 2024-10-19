const { useState, useEffect } = React
import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onRemoveMail, onReadMail, onStaredMail }) {

    function stripHTML(htmlContent) {
        const parser = new DOMParser()
        const doc = parser.parseFromString(htmlContent, 'text/html')
        return doc.body.textContent || ""
      }
      
      
    //TODO handel stars... add onclick for nav to MailDetails
    //TODO Renders the subject (with text size limit) 
    //TODO  Gives visual indication for read/unread   
    //TODO  Support hover state   
    
    const { subject, body, isRead, isStared, sentAt, from } = mail

    const isReadClass = isRead ? 'read' : 'unread'
    const envelope = isRead ? 'fa-solid fa-envelope-open' : 'fa-solid fa-envelope'
    
    return (
        <div className={`mail-preview ${isReadClass}`}>
            <div className="first-letter">
                {from[0]}
            </div>
            <span className="sender">
                {from.split('@')[0]}
            </span>
            <span
                className={isStared ? "fa-solid fa-star star filled" : "fa-regular fa-star star"}
                onClick={(e) => {
                    
                    e.stopPropagation()
                    onStaredMail(mail.id)
                }}

                style={{ cursor: "pointer", fontSize: "1.5rem" }}
                
            >

            </span>

            <span className="mail-from">{from} </span>
            <span className="mail-subject">{subject} </span>
            <span className="mail-body">{ stripHTML(body)} </span>
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

