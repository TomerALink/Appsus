export function NotePreview({ note }) { 

}
/////////////////////////////
// The <NotePreview> component, uses a dynamic component to show different types
// of notes:
    // o <NoteTxt>
    // o <NoteImg>
    // o <NoteVideo>
    // o <NoteTodos>
// • Extra:
    // o <NoteAudio>
    // o <NoteCanvas>
    // o <NoteMap>
// • Bonus:
    // o <NoteRecording>
// Note - the props for those components is similar:
// • info
// • onChangeInfo
////////////////////////////////////////////////////////
export function CarPreview({ car }) {

    const { vendor, speed } = car
    return (
        <article className="car-preview">
            <h2>Vendor: {vendor}</h2>
            <h4>Car Speed: {speed}</h4>
            <img src={`../assets/img/${vendor}.png`} alt="Car Image" />
        </article>
    )
}