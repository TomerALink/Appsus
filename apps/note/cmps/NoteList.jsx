export function NoteList() {
    return <div>note list</div>
}


//////////////////////////////

const { Link } = ReactRouterDOM


import { CarPreview } from "./CarPreview.jsx";

export function CarList({ cars, onRemoveCar }) {

    return (
        <ul className="car-list">
            {cars.map(car =>
                <li key={car.id}>
                    <CarPreview car={car} />
                    <section>
                        <button onClick={() => onRemoveCar(car.id)}>Remove</button>
                        <button ><Link to={`/car/${car.id}`}>Details</Link></button>
                        <button ><Link to={`/car/edit/${car.id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )

}