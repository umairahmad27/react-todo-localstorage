import React, { useState } from 'react'
import Select from 'react-select';
import cities from "../../../data/cities.json"

const initialState = {
    title: "",
    location: "",
    description: "",
}

export default function Create() {

    const [state, setState] = useState(initialState)

    const handleChange = e => {
        let { name, value } = e.target
        value = value.trim()
        setState(s => ({ ...s, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault();

        let { title, location, description } = state

        if (title.length < 3) {
            return window.toastify("Please enter your title correctly", "error")
        }
        if (!location) {
            return window.toastify("Please select your location", "error")
        }
        if (description.length < 10) {
            return window.toastify("Please enter your description correctly", "error")
        }

        let todo = { ...state }
        todo.id = window.getRandomId();
        todo.dateCreated = new Date();
        todo.status = "active"

        create(todo)
    }

    const create = (todo) => {
        console.log(todo)

        let todos = JSON.parse(localStorage.getItem("todos")) || []

        todos.push(todo)

        localStorage.setItem("todos", JSON.stringify(todos))
    }

    return (
        <div className='create py-5 bg-light'>
            <div className="container">
                <div className="row mb-5">
                    <div className="col">
                        <h1 className="text-center mb-3">Add Todo</h1>
                        <div className="divider"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1">
                        <div className="card p-3 p-md-4 p-lg-5">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <input type="text" name="title" placeholder='Title' className='form-control' onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            defaultValue={cities[0]}
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
                                        <textarea name="description" placeholder='Description' className='form-control' onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center">
                                        <button className='btn btn-primary text-white'>Add</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
