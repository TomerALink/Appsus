

const {useNavigate, Link, Outlet } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, onRemoveMail, onReadMail }) {

    const navigate = useNavigate()

    function onNavToMailDetails(id) {
        navigate(`/mail/${id}`)
    }
    return (
        <React.Fragment>
            <ul className="mail-list">
                {mails.map(mail =>
                    <li key={mail.id}>

                        <div onClick={() => onNavToMailDetails(mail.id)}>

                            <MailPreview mail={mail} />
                        </div>
                        <section>
                            {/* <button onClick={() => onRemoveMail(mail.id)}>Remove</button> */}
                            {/* <button onClick={() => onReadMail(mail.id)}>Remove</button> */}


                        </section>

                    </li>
                )}
            </ul>
            <nav>
            <button className="send-button"><Link to="/mail/newMail">New mail</Link></button>

            </nav>
            <Outlet />
        </React.Fragment>
    )
}
