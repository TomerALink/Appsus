const { useState } = React

export function NotePreview({ note }) {
    return (
        <DynamicCmp note={note} />
    )
}

function DynamicCmp(props) {
    switch (props.note.type) {
        case 'NoteTxt':
            return <NoteTxtPrev {...props} />
        case 'NoteImg':
            return <NoteImgPrev {...props} />
        case 'NoteTodos':
            return <NoteTodosPrev {...props} />
    }
}

function NoteTxtPrev({ note }) {
    const [isShowLong, setIsShowLong] = useState(false)
    const length = 100

    function onToggleIsShowLong() {
        setIsShowLong(isShowLong => !isShowLong)
    }

    const isLongText = note.info.txt.length > length
    const textToShow = (isShowLong || !isLongText) ? note.info.txt : (note.info.txt.substring(0, length)) + '...'
    return (
        <React.Fragment>
            <p>{textToShow}</p>
            {isLongText &&
                <button className="long-btn" onClick={onToggleIsShowLong}>
                    {isShowLong ? 'Show Less' : 'Read More'}
                </button>
            }
        </React.Fragment>
    )
}

function NoteImgPrev({ note }) {
    return (
        <React.Fragment>
            <h2>{note.info.title}</h2>
            <img src={note.info.url} alt='note-image'></img>
        </React.Fragment>
    )
}

function NoteTodosPrev({ note }) {
    const [isShowLong, setIsShowLong] = useState(false)
    const length = 4

    function onToggleIsShowLong() {
        setIsShowLong(isShowLong => !isShowLong)
    }

    const isLongList = note.info.todos.length > length
    const listToShow = (isShowLong || !isLongList) ? note.info.todos : note.info.todos.slice(0, length)

    return (
        <React.Fragment>
            <h2>{note.info.title}</h2>
            <ul className='todos-list'>
                {listToShow && listToShow.map((todo, idx) =>
                    <li key={idx} className={todo.doneAt ? 'done' : ''} >{todo.txt}</li>
                )}
            </ul>
            {isLongList &&
                <button className="long-btn" onClick={onToggleIsShowLong}>
                    {isShowLong ? 'Show Less' : 'Read More'}
                </button>
            }
        </React.Fragment>
    )
}