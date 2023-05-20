import { ProgressBar } from "./progress-bar.jsx";


export function TodoFilter({ onSearch, onSetFilter, onSetSort, onAddTodo }) {

  function onHandleSearch(ev) {
    const val = ev.target.value
    console.log(val);
    onSearch(val)
  }

  function onAll({ target }) {
    let isAll = target.checked
    if (isAll) onSetFilter({ all: true })
    else onSetFilter({ all: false })
  }

  function onActive({ target }) {
    let isActive = target.checked
    if (isActive) onSetFilter({ Active: true })
    else onSetFilter({ Active: false })
  }

  function onDone({ target }) {
    let isDone = target.checked
    if (isDone) onSetFilter({ done: true })
    else onSetFilter({ done: false })
  }

  return (
    <section className="todo-filter fully">
      <p>Filters:</p>

      <select onChange={onSetSort} className="txt-input" name="sort" id="sort">
        <option value="title">Name</option>
        <option value="createdAt">Created At</option>
      </select>
      <div className="lables">
        <div>
          <input type="checkbox" onChange={onAll} id="all" />
          <label htmlFor="all">All</label>
        </div><div>
          <input type="checkbox" onChange={onActive} id="need-CR" />
          <label htmlFor="need-CR">Active</label>
        </div><div>
          <input type="checkbox" onChange={onDone} id="dev-branch" />
          <label htmlFor="dev-branch">Done</label>
        </div>
      </div>
      <input type="search" className="txt-input" placeholder="search" onChange={onHandleSearch} />
      <ProgressBar />
      <button className="btn" onClick={onAddTodo}>Add Todo</button>
    </section>
  );
}
