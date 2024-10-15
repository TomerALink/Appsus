
export function MailFolderList({ mails }) {
    function calculateSummary(emails) {
        console.log(emails)
        return emails.reduce(function (acc, email) {
            if (email.from === 'user@appsus.com' && !email.isDeleted) {
                acc.inbox++;
            }
            if (email.to === 'user@appsus.com' && !email.isDeleted) {
                acc.sent++;
            }
            if (email.isDeleted) {
                acc.trash++;
            }
            if (email.isStared && !email.isDeleted) {
                acc.starred++;
            }
            return acc;
        }, {
            inbox: 0,
            sent: 0,
            trash: 0,
            starred: 0
        });
    }


    var summary = calculateSummary(mails);

    return (
        <nav className="side-menu">
            <ul>
                <li><i className="fa-solid fa-inbox"> </i>Inbox: {summary.inbox}</li>
                <li><i className="fa-regular fa-star"></i>Starred: {summary.starred}</li>
                <li><i className="fa-regular fa-paper-plane"></i>Sent: {summary.sent}</li>
                <li><i className="fa-regular fa-file"></i>Draft</li>
                <li><i className="fa-regular fa-trash"></i>Trash: {summary.trash}</li>
                
            </ul>
        </nav>
    );
}

export default MailFolderList;
