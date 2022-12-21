import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './Login'
import Register from './Register'

export default function Index() {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </>
    )
}
