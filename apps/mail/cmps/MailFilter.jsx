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

            <form>                
                <div className="search fa-solid fa-magnifying-glass">
                <input  onChange={handleChange} placeholder='Search'  value={txt} type="text" name="txt" id="txt" />
                </div>

                <label>
                    <input type="checkbox" value={false} onChange={handleChange} name="unread" id="unread"/>
                    {"Unread emails"}
                </label>

            </form>
        </section>
    )
}