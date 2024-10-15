
import { mailService } from "../../../services/mail.service.js"
const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function MailCompose() {


    const [mail, setEmail] = useState({...mailService.getEmptyMail(), ...{from: mailService.loggedinUser.email}})

      function handleChange({ target }) {
        const field = target.name
        let value = target.value
        // value += ','
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        
        setEmail(prevMail => ({ ...prevMail, [field]: value }))
    }
    
      const handleSend = () => {
        mailService.save(mail)
        .then(mail => {
            console.log('mail saved secsesfully', mail)
            showSuccessMsg(`mail sent secsesfully`)

        })
        .catch(err => {
            console.log('error at saving mail: ', err)
        }).finally(()=>{
            navigate(`/mail`)
        })
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