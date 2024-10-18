import { MailPreview } from "./MailPreview.jsx"
const { useState } = React

export function Accordion({ children,  mail, onRemoveMail, onReadMail, onStaredMail }) {

    const [isOpen, setIsOpen] = useState(false)
    const openClass = isOpen ? 'open' : ''

    return (
        <section className={`accordion ${openClass}`}>
            <section onClick={() => setIsOpen(isOpen => !isOpen)} className="title-container" >
          
                <MailPreview mail={mail} onRemoveMail={onRemoveMail} onReadMail={onReadMail} onStaredMail={onStaredMail} />
               
            </section>
            <section className="content">
                {children}
            </section>
        </section >
    )
}