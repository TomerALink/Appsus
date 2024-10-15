import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

const { useParams, Link, useNavigate } = ReactRouterDOM

const { useEffect, useState } = React

export function MailDetails() {
  const [mail, setMail] = useState(null)
  const { mailId } = useParams()
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

  return (
    <section className="mail-details">
      <div>
        <a onClick={onBack} className="fa-solid fa-arrow-right" ></a>
      </div>
      <div>
        <h1>{subject}</h1>
        <div><span><h2>{from}</h2> </span> {utilService.epochToDate(sentAt)}<span /></div>
        <div>{to}</div>
        <p>{body}</p>

      </div>

    </section>
  )
}