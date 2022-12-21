import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Frontend from "./Frontend"
import Auth from "./Auth"

export default function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/*' element={<Frontend />} />
                <Route exact path='/auth*' element={<Auth />} />
                {/* <Route path='/dashboard' element={<>Root Route</>} />
                <Route path='/auth' element={<>Root Route</>} /> */}
            </Routes>
        </BrowserRouter>
    )
}
