const { Fragment } = React
const { useEffect, useState } = React

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

    /// i think i need to convert all this section to todos and not single todo!!

    const [todo, setTodo] = useState({ txt: '', doneAt: null })

    function handleList() {
        console.log('1', todo)
        if (note.info.todos) note.info.todos.push(todo)
        const target = {
            name: 'todos',
            value: note.info.todos ? note.info.todos : [todo]
        }
        handleAdd({ target })
        setTodo({ txt: '', doneAt: null })
        console.log('2', note.info.todos) //
    }

    function onDoneTodo({ item, idx }) {
        console.log('onDoneTodo Debug', item) //
        const curTodo = item
        curTodo.doneAt = curTodo.doneAt ? null : new Date()
        note.info.todos.splice(idx, 1, curTodo)
        const target = { name: 'todos', value: note.info.todos }
        handleAdd({ target })
    }

    function onRemoveTodo(idx) {
        console.log('onRemoveTodo Debug', idx) //
        note.info.todos.splice(idx, 1)
        const target = { name: 'todos', value: note.info.todos }
        handleAdd({ target })
        // renderList()
    }

    // function renderList(){



    console.log('3', note.info.todos) //
    const todoTxt = todo.txt
    return (
        <Fragment>
            <div className='todos-add'>
                <input value={todoTxt} onChange={(ev) => setTodo(prevTodo => ({ ...prevTodo, txt: ev.target.value }))} type="text" name="todo" id="todo" placeholder="Enter list item" />
                <button type="button" onClick={handleList}>Add</button>
            </div>
            <TodoList onDoneTodo={onDoneTodo} onRemoveTodo={onRemoveTodo} todos={note.info.todos} />
        </Fragment>
    )
}

function TodoList(onDoneTodo, onRemoveTodo, todos) {
    function onDoneTodoList(item, idx) {
        onDoneTodo(item, idx)
    }

    function onRemoveTodoList(idx) {
        onRemoveTodo(idx)
    }
    return (
        <Fragment>
            <ul className='todos-list'>
                {todos && todos.map((item, idx) =>
                    <li key={idx} {...item.doneAt ? 'done' : ''} >
                        <span>{`${item.txt}`}</span>
                        <button type='button' onClick={() => onDoneTodoList(item, idx)}>v</button>
                        <button type='button' onClick={() => onRemoveTodoList(idx)}>x</button>
                    </li>
                )}
            </ul>
        </Fragment>
    )
}