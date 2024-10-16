const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js"

export function MailFolderList({ activeFilter, mails, onSetFilter }) {


    function calculateSummary() {
        const [activeFilter, setActiveFilter] = useState('');

    
        return mails.reduce(function (acc, email) {
            if (email.to === mailService.loggedinUser.email && !email.isDeleted) {
                acc.inbox++;
                if (!email.isRead) {
                    acc.unread++;
                }
            }
            if (email.from === mailService.loggedinUser.email && !email.isDeleted) {
                acc.sent++
            }
            if (email.isDeleted) {
                acc.trash++
            }

            if (email.isStared && !email.isDeleted) {
                acc.starred++
            }
            return acc
        }, {
            inbox: 0,
            sent: 0,
            trash: 0,
            starred: 0,
            unread: 0
        })
    }

    function onFilterMails(status) {

        let filterBy = { status: status }
        if (status === 'inbox') filterBy = { ...mailService.getDefaultFilter(), status: status }

        onSetFilter(filterBy)
    }

    var summary = calculateSummary()

    return (
        <nav className="side-menu">
            <ul>
                <li onClick={() => onFilterMails('inbox')} className={activeFilter === 'inbox' ? 'active' : ''}>
                    <span className="inbox-counter">
                        <i data-count={summary.unread} className="fa-solid fa-inbox"> </i>
                    </span>
                    <span>Inbox </span>
                    <span>{summary.inbox}</span>
                </li>

                <li onClick={() => onFilterMails('starred')} className={activeFilter === 'starred' ? 'active' : ''}>
                    <i className="fa-regular fa-star"></i>
                    <span>Starred</span>
                    <span>{summary.starred}</span>
                </li>

                <li onClick={() => onFilterMails('sent')} className={activeFilter === 'sent' ? 'active' : ''}>
                    <i className="fa-regular fa-paper-plane"></i>
                    <span>Sent</span>
                    <span>{summary.sent}</span> 
                </li>


                <li onClick={() => onFilterMails('draft')} className={activeFilter === 'draft' ? 'active' : ''}>
                   <i className="fa-regular fa-file"></i>
                   <span>Draft</span>
                   <span>{summary.sent}</span>
                </li>

                <li onClick={() => onFilterMails('trash')} className={activeFilter === 'trash' ? 'active' : ''}>
                    <i className="fa-solid fa-trash"></i>
                    <span>Trash</span>
                    <span>{summary.trash}</span>
                </li>

            </ul>
        </nav>
    );
}

export default MailFolderList;
