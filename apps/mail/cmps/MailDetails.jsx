import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

const { useParams, Link, useNavigate } = ReactRouterDOM

const { useEffect, useState } = React

export function MailDetails({ mailId }) {
  const [mail, setMail] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    loadMail()
  }, [mailId, mail])

  function loadMail() {
    mailService.get(mailId)
      .then(setMail)
      .catch(err => {
        console.log('Problem loading mail:', err)
      })
  }


  if (!mail) return <div>Loading...</div>;

  const { id, createdAt, subject, body, isRead, isStared, sentAt, removedAt, from, to } = mail;

  function onBack() {
    navigate("/mail")
  }

  function onSaveMailAsNote() {

  }

  function getSenderEmail(from) {
    return from.split("@")[0]
  }

  return (
    <section className="mail-details">

      <div className="subject-buttons">
        <h1>{subject}</h1>

        <div className="mail-buttons">
          <span><i className="fa-solid fa-expand"></i></span>
          <span><i style={{ transform: "scaleX(-1)" }} className="fa-solid fa-share"></i></span>
          <span onClick={onSaveMailAsNote} ><i className="fa-solid fa-paper-plane"></i></span>
          <span><i className="fa-solid fa-trash"></i></span>
        </div>
      </div>
      <div>
        <h2>{getSenderEmail(from)} <span> {`<${from}>`}</span></h2>
      </div>
      <section className="mail-body content">
      <div
      dangerouslySetInnerHTML={{ __html: body }}
    />
    
            </section>
          

    </section>
  )
}