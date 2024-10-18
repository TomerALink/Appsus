const { Fragment } = React
const { useEffect } = React

export function NoteTxt({ note, handleAdd }) {
    const numRow = 4
    const numCol = 50

    useEffect(() => {
        if (note.info.title || '') {
            let target = { name: 'txt', value: note.info.title || '' }
            handleAdd({ target })
            target = { name: 'title', value: '' }
            handleAdd({ target })
        }
    }, [])

    const newTxt = note.info.txt

    return (
        <Fragment>
            <textarea value={newTxt} onChange={handleAdd} name="txt" rows={numRow.toString()} cols={numCol.toString()} placeholder="Enter text"></textarea>
        </Fragment>
    )
}

export function NoteImg({ note, handleAdd }) {
    const newUrl = note.info.url || ''

    return (
        <Fragment>
            <input value={newUrl} onChange={handleAdd} type="url" name="url" id="url" pattern="https://.*" placeholder="Enter image URL" required />
        </Fragment>
    )

}

export function NoteVideo({ note, handleAdd }) {
    const newUrl = note.info.url || ''

    return (
        <Fragment>
            <input value={newUrl} onChange={handleAdd} type="url" name="url" id="url" pattern="https://.*" placeholder="Enter video URL" required />
        </Fragment>
    )
}

export function NoteTodos({ note, handleAdd }) {
    return (
        <Fragment>

        </Fragment>
    )
}

//     info: {
//         title: 'Get my stuff together',
//         todos: [
//             { txt: 'Driving license', doneAt: null },
//             { txt: 'Coding power', doneAt: 187111111 }
//         ]
//     }