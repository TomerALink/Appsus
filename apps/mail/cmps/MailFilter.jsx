const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilter }) {

    const [mailFilterBy, setMailFilterBy] = useState({ ...filterBy })


    useEffect(() => {
        onSetMailFilter(mailFilterBy)
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

    const { txt} = mailFilterBy// TODO add more
    return (
        <section className="mail-filter">
            <h2>Filter Our Mails</h2>
            <form>
                <label htmlFor="txt">Seaech mail</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                {/* <label htmlFor="minSpeed">Max Price</label>
                <input onChange={handleChange} value={price || ''} type="number" name="price" id="price" /> */}

                <button>Submit</button>
            </form>
        </section>
    )
}