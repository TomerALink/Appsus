export function NotePreview({ note }) {
    const showTxt = note.info.title || note.info.txt
    return (
        <h2>{showTxt}</h2>
    )
}

