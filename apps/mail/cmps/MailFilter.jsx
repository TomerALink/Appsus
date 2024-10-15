const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilter }) {

    const [mailFilterBy, setMailFilterBy] = useState({ ...filterBy })


    useEffect(() => {
        onSetFilter(mailFilterBy)
    }, [mailFilterBy])

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

        setMailFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt } = mailFilterBy// TODO add more
    return (
        <section className="mail-filter">
            <h2>Filter Our Mails</h2>
            <form>
                <label htmlFor="txt">Seaech mail</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />


                <label>
                    <input type="checkbox" value={false} onChange={handleChange} name="unread" id="unread"/>
                    {"Unread emails"}
                </label>

                <label>
                    <input type="checkbox" value={false} onChange={handleChange} name="stared" id="stared"/>
                    {"Stared emails"}
                </label>

                <button>Submit</button>
            </form>
        </section>
    )
}