import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import Select from 'react-select';
import cities from "../../../data/cities.json"

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: "60%"
  },
};

const initialState = {
  title: "",
  location: "",
  description: "",
}

export default function Read(props) {

  const [state, setState] = useState(initialState)
  const [todos, setTodos] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = e => {
    let { name, value } = e.target
    setState(s => ({ ...s, [name]: value }))
  }

  useEffect(() => {
    const { todos } = props

    setTodos(todos)
  }, [props])

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const handleUpdate = (e) => {

    e.preventDefault();

    let { title, location, description, status } = state
    title = title.trim()
    description = description.trim()

    if (title.length < 3) {
      return window.toastify("Please enter your title correctly", "error")
    }
    if (!location) {
      return window.toastify("Please select your location", "error")
    }
    if (description.length < 10) {
      return window.toastify("Please enter your description correctly", "error")
    }
    if (!status) {
      return window.toastify("Please select your todo status", "error")
    }

    let todo = { ...state, title, description }
    todo.dateModified = new Date();

    const updatedTodos = todos.map((oldTodo) => {
      if (oldTodo.id === todo.id)
        return todo
      return oldTodo
    })

    setTodos(updatedTodos)

    localStorage.setItem("todos", JSON.stringify(updatedTodos))
    window.toastify("Your todo has been successfully updated", "success")

    toggleModal()
  }
  const handleDelete = todo => {

    let filteredData = todos.filter((oldTodo) => {
      return oldTodo.id !== todo.id
    })

    setTodos(filteredData)
    localStorage.setItem("todos", JSON.stringify(filteredData))
  }

  return (
    <>
      <div className='create py-5'>
        <div className="container">
          <div className="row mb-5">
            <div className="col">
              <h1 className="text-center mb-3">Todos</h1>
              <div className="divider"></div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {todos.length < 1
                ? <div className="card p-3 p-md-5">
                  <h2 className='text-center mb-0'>HURRAY! No tasks are available. &#128512;</h2>
                </div>
                : <div className='table-responsive'>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Location</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todos.map((todo, i) => {
                        return <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{todo.title}</td>
                          <td>{todo.location}</td>
                          <td>{todo.description}</td>
                          <td>
                            <button className='btn btn-info btn-sm me-1 mb-1' onClick={() => { setState(todo); setIsModalOpen(true) }}>E</button>
                            <button className='btn btn-danger btn-sm' onClick={() => { handleDelete(todo) }}>D</button>
                          </td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
              }

            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Modal"
        ariaHideApp={false}
      // className="modal"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Todo</h1>
              <button className="btn-close" onClick={toggleModal}></button>
            </div>
            <div className="modal-body my-4">
              <form>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <input type="text" name="title" placeholder='Title' className='form-control' value={state.title} onChange={handleChange} />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={cities[20]}
                      // isClearable={true}
                      isSearchable={true}
                      name="location"
                      options={cities}
                      onChange={e => { setState(s => ({ ...s, location: e.value })) }}
                    />
                    {/* <input type="text" name="location" placeholder='Location' className='form-control' onChange={handleChange} /> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-3">
                    <textarea name="description" placeholder='Description' className='form-control' value={state.description} onChange={handleChange}></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <select name="status" value={state.status} className='form-control' onChange={handleChange}>
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
              <button type="button" className="btn btn-primary text-white ms-2" onClick={handleUpdate}>Save changes</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
