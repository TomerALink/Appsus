// import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../../../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { getTruthyValues } from "../../../services/util.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailIndex() {
    

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
//     // const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))



    useEffect(() => {
        // setSearchParams(getTruthyValues(filterBy))
        loadMails()
    // }, [filterBy])
}, [])

    function loadMails() {
        // mailService.query(filterBy)
        mailService.query()
            .then(setMails)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(mails =>
                    mails.filter(mail => mail.id !== mailId)
                )
            })
            .then(
                showSuccessMsg(`Mail removed secssesfuly!`)
            )
            .catch(err => {
                showErrorMsg(`Problems removing mail ${mailId}`)
                console.log('Problems removing mail:', err)
            })
    }

    // function onSetFilter(filterByToEdit) {
    //     setFilterBy(prevFilter => ({...prevFilter, ...filterByToEdit}))
    // }

   

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            {/* <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <section>
               <button> <Link to="/mail/add-manual"> Add Mail</Link> </button>
            </section> */}
            <MailList   onRemoveMail={onRemoveMail} mails={mails} />
           
        </section>
    )

}
