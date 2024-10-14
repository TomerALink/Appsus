const { Link } = ReactRouterDOM

import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React


export function NoteIndex() {
    return <div>note app</div>
}


///////////////////////////////////////////////////

// Build the root component: <NoteIndex>
// This component renders the <NotePreview> component that allow viewing the notes
// preview, and also changing color, pin, etc.

///////////////////////////////////////////////////////////////////////

// const { Link } = ReactRouterDOM

// import { CarFilter } from "../cmps/CarFilter.jsx"
// import { CarList } from "../cmps/CarList.jsx"
// import { carService } from "../services/car.service.js"
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

// const { useState, useEffect } = React

export function CarIndex() {

    const [cars, setCars] = useState(null)
    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())

    useEffect(() => {
        loadCars()
    }, [filterBy])

    function loadCars() {
        carService.query(filterBy)
            .then(setCars)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveCar(carId) {
        carService.remove(carId)
            .then(() => {
                setCars(cars =>
                    cars.filter(car => car.id !== carId)
                )
                showSuccessMsg('Car removed successfully')
            })
            .catch(err => {
                console.log('Problems removing car:', err)
                showErrorMsg(`Problems removing car (${carId})`)
            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }



    if (!cars) return <div>Loading...</div>
    return (
        <section className="car-index">
            <CarFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <section>
                <Link to="/car/edit">Add Car</Link>
            </section>
            <CarList onRemoveCar={onRemoveCar} cars={cars} />
        </section>
    )

}