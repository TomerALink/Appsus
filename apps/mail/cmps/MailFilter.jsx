const { useState, useEffect, useRef } = React

export function MailFilter({ filterBy, onSetFilter, onToggleMenu }) {

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
                <div className="search">
                    
                        <i className="mag fa-solid fa-magnifying-glass"></i>
                        <i onClick={onToggleMenu} className=" fa-solid fa-bars my-burger-menu"></i>
                    

                    <input onChange={handleChange} placeholder='Search' value={txt} type="text" name="txt" id="txt" />
                </div>

                
                    <span className="unread-checkbox">
                    <input type="checkbox" value={false} onChange={handleChange} name="unread" id="unread" />
                    {"Unread emails"}
                    </span>
              

            </form>
        </section>
    )
}