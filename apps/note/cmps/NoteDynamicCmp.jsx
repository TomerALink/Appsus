const { Fragment } = React
const { useEffect, useState } = React

export function NoteTxt({ note, handleAdd }) {
    const numRow = 4
    const numCol = 50

    // useEffect(() => {
    //     if (note.info.title || '') {
    //         let target = { name: 'txt', value: note.info.title || '' }
    //         handleAdd({ target })
    //         target = { name: 'title', value: '' }
    //         handleAdd({ target })
    //     }
    // }, [])

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

export function NoteTodos({ note, handleAdd }) {
    const [todo, setTodo] = useState({ txt: '', doneAt: null })

    function handleList() {
        //console.log('handle 1', todo)
        note.info.todos.push(todo)
        const target = { name: 'todos', value: note.info.todos }
        handleAdd({ target })
        setTodo({ txt: '', doneAt: null })
        //console.log('handle 2', note.info.todos) //
    }

    function onDoneTodo(item, idx) {
        //console.log('Done 1', item, idx) //
        const curTodo = item
        curTodo.doneAt = curTodo.doneAt ? null : Date.now()
        note.info.todos.splice(idx, 1, curTodo)
        //console.log('Done 2', note.info.todos) //
        const target = { name: 'todos', value: note.info.todos }
        //console.log('Done 3', target) //
        handleAdd({ target })
        setTodo({ txt: '', doneAt: null })
    }

    function onRemoveTodo(idx) {
        //console.log('Remove 1', idx) //
        note.info.todos.splice(idx, 1)
        const target = { name: 'todos', value: note.info.todos }
        handleAdd({ target })
        setTodo({ txt: '', doneAt: null })
        //console.log('Remove 2', note.info.todos) //
    }

    //console.log('All', note.info.todos) //
    const todoTxt = todo.txt
    return (
        <Fragment>
            <div className='todos-add'>
                <input value={todoTxt} onChange={(ev) => setTodo(prevTodo => ({ ...prevTodo, txt: ev.target.value }))} type="text" name="todo" id="todo" placeholder="Enter list item" />
                <button type="button" onClick={handleList}>Add</button>
            </div>
            {/* <TodoList onDoneTodo={onDoneTodo} onRemoveTodo={onRemoveTodo} todos={note.info.todos} /> */}
            <ul className='todos-list'>
                {(note.info.todos.length > 0) && note.info.todos.map((item, idx) => {
                    // console.log('return', item.doneAt ? 'done' : '')
                    return (
                        <li key={idx} className={item.doneAt ? 'done' : ''} >
                            <span>{item.txt}</span>
                            <button type='button' onClick={() => onDoneTodo(item, idx)}>v</button>
                            <button type='button' onClick={() => onRemoveTodo(idx)}>x</button>
                        </li>
                    )
                })}
            </ul>
        </Fragment>
    )
}