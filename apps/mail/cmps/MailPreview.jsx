
export function MailPreview({ mail }) {

    
    const { subject, body, isRead, sentAt,  from } = mail

    //TODO handel stars... add onclick for nav to MailDetails
    //TODO Renders the subject (with text size limit) 
    //TODO  Gives visual indication for read/unread   
    //TODO  Support hover state   

    function epochToDate(epoch) {
        const date = new Date(epoch);
        const options = { month: 'short', day: 'numeric' };
        const str = date.toLocaleString('en-US', options);
        return str;
    }

    const isReadClass = isRead ? 'read' : 'unread'
    return (
        <div className={`mail-preview ${isReadClass}`}>
            <span>★ </span>
            <span>{from} </span>
            <span>{subject} </span>
            <span>{body} </span>
            <span>{epochToDate(sentAt)} </span>
            <div className="buttons" ><a  class="fa-solid fa-envelope-open"> </a> <a class="fa-solid fa-trash">   </a> </div>
        </div>
    )
}

