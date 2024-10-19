
import { mailService } from "../services/mail.service.js"
const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
const { useSearchParams } = ReactRouterDOM

export function MailCompose({ onSendMail, toggleCompose }) {

  const [mail, setMail] = useState({ ...mailService.getEmptyMail(), ...{ from: mailService.loggedinUser.email } })
  const [searchParams, setSearchParams] = useSearchParams()
  const [mailFromNote, setMailFromNote] = useState(mailService.getValuesFromSearchParams(searchParams))

  useEffect(() => {

    if (mailFromNote.subject) setMail(prevMail => ({ ...prevMail, subject: mailFromNote.subject }))
    if (mailFromNote.body) setMail(prevMail => ({ ...prevMail, body: mailFromNote.body }))
    // console.log('mailFromNote', mailFromNote)
  }, [])


  const handleSend = (ev) => {
    ev.preventDefault()

    setMail(prevMail => ({ ...prevMail, sentAt: new Date() }))

    onSendMail(mail)

  }

  const navigate = useNavigate()

  function onNavToMail() {

    navigate(`/mail/`)
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    // value += ','
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }

    setMail(prevMail => ({ ...prevMail, [field]: value }))
  }


  return (
    (
      <div className="mail-compose">
        <h2 className="new-message">
          New Message
        </h2>
        <button className="close-button" onClick={toggleCompose}>X</button>
        <div className="input from-input">
          <label>From: </label>
          <span className="from-input">{mail.from}</span>

        </div>
        <div className="input">
          <label>To: </label>
          <input
            type="email"
            name="to"
            value={mail.to}
            onChange={handleChange}

          />
        </div>
        <div className="input">
          <label>Subject: </label>
          <input
            type="text"
            name="subject"
            value={mail.subject}
            onChange={handleChange}

          />
        </div>
        <div className="input body-input">
          <textarea
            name="body"
            value={mail.body}
            onChange={handleChange}
            rows="8"

          />
        </div>
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>
    )

  )
}