import React, { useEffect } from 'react'

export default function Read() {

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    console.log(todos)
  }, [])

  return (
    <div>Read</div>
  )
}
