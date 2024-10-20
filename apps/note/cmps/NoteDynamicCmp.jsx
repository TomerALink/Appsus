const { Fragment } = React
const { useEffect, useState } = React

export function NoteTxt({ note, handleAdd }) {
    const numRow = 4
    const numCol = 50
    const newTxt = note.info.txt

    return (
        <Fragment>
            <textarea value={newTxt} style={note.style} onChange={handleAdd} name="txt" rows={numRow.toString()} cols={numCol.toString()} placeholder="Enter text"></textarea>
        </Fragment>
    )
}

export function NoteImg({ note, handleAdd }) {
    const newUrl = note.info.url || ''

    return (
        <Fragment>
            <input value={newUrl} style={note.style} onChange={handleAdd} type="url" name="url" id="url" pattern="https://.*" placeholder="Enter image URL" required />
        </Fragment>
    )

}

export function NoteTodos({ note, handleAdd }) {
    const [todo, setTodo] = useState({ txt: '', doneAt: null })

    function handleList() {
        note.info.todos.push(todo)
        const target = { name: 'todos', value: note.info.todos }
        handleAdd({ target })
        setTodo({ txt: '', doneAt: null })
    }

    function onDoneTodo(item, idx) {
        const curTodo = item
        curTodo.doneAt = curTodo.doneAt ? null : Date.now()
        note.info.todos.splice(idx, 1, curTodo)
        const target = { name: 'todos', value: note.info.todos }
        handleAdd({ target })
        setTodo({ txt: '', doneAt: null })
    }

    function onRemoveTodo(idx) {
        note.info.todos.splice(idx, 1)
        const target = { name: 'todos', value: note.info.todos }
        handleAdd({ target })
        setTodo({ txt: '', doneAt: null })
    }

    const todoTxt = todo.txt
    return (
        <section className='todos-add'>
            <div className='todos-add-item'>
                <input value={todoTxt} onChange={(ev) => setTodo(prevTodo => ({ ...prevTodo, txt: ev.target.value }))} type="text" name="todo" id="todo" placeholder="Enter list item" />
                <button type="button" className="fa-solid fa-plus" onClick={handleList}></button>
            </div>
            <ul className='todos-add-list' style={note.style}>
                {(note.info.todos.length > 0) && note.info.todos.map((item, idx) => {
                    return (
                        <li key={idx} className={item.doneAt ? 'done' : ''} >
                            <button type='button' className="fa-solid fa-check" onClick={() => onDoneTodo(item, idx)}></button>
                            <button type='button' className="fa-solid fa-xmark" onClick={() => onRemoveTodo(idx)}></button>
                            <span>{item.txt}</span>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}