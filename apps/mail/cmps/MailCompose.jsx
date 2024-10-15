
import { mailService } from "../services/mail.service.js"
const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function MailCompose({onSendMail, toggleCompose}) {

  const [mail, setMail] = useState({ ...mailService.getEmptyMail(), ...{ from: mailService.loggedinUser.email } })

  useEffect(() => {

  }, [mail])


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
        <h2>New Message</h2>
        <button className="close-button" onClick={toggleCompose}>X</button>
        <div>
          <label>From: </label>
          <span className="from-input">{mail.from}</span>

        </div>
        <div>
          <label>To: </label>
          <input
            type="email"
            name="to"
            value={mail.to}
            onChange={handleChange}

          />
        </div>
        <div>
          <label>Subject: </label>
          <input
            type="text"
            name="subject"
            value={mail.subject}
            onChange={handleChange}

          />
        </div>
        <div>
          <label>Body: </label>
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