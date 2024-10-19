import { MailPreview } from "./MailPreview.jsx"
const { useState } = React

export function Accordion({ children,  mail, onRemoveMail, onReadMail, onStaredMail }) {

    const [isOpen, setIsOpen] = useState(false)
    const openClass = isOpen ? 'open' : ''

    function onOpen(){
        setIsOpen(isOpen => !isOpen)
        onReadMail(mail.id)
    }

    return (
        <section className={`accordion ${openClass}`}>
            <section onClick={() => onOpen()} className="title-container" >
          
                <MailPreview mail={mail} onRemoveMail={onRemoveMail} onReadMail={onReadMail} onStaredMail={onStaredMail} />
               
            </section>
            <section className="content">
                {children}
            </section>
        </section >
    )
}