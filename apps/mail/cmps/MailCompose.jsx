
import { mailService } from "../../../services/mail.service.js"
const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function MailCompose() {

    const [email, setEmail] = useState({
        to: '',
        from: mailService.loggedinUser.email,
        subject: '',
        body: ''
      })
    
      const handleChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value })
      }
    
      const handleSend = () => {
        // Logic for sending email can be added here
        alert(`Email sent to ${email.to} from ${email.from}`)
      }

      const navigate = useNavigate()

      function onNavToMail(){

        navigate(`/mail/`)
      }



    return (
        (
            <div className="mail-compose">
              <h2>New Message</h2>
              <button className="close-button" onClick={onNavToMail}>X</button>
              <div>
                <label>From: </label>
                <span className="from-input">{email.from}</span>
                 
              </div>
              <div>
                <label>To: </label>
                <input
                  type="email"
                  name="to"
                  value={email.to}
                  onChange={handleChange}
                  
                />
              </div>
              <div>
                <label>Subject: </label>
                <input
                  type="text"
                  name="subject"
                  value={email.subject}
                  onChange={handleChange}
                  
                />
              </div>
              <div>
                <label>Body: </label>
                <textarea
                  name="body"
                  value={email.body}
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