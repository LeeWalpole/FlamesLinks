"use client"

import React, { useState } from "react"

import addTodo from "./add"

// Replace with the actual path to your addTodo module

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Call the addTodo function with the entered title
    addTodo(title)

    // Clear the input field
    setTitle("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={handleChange} />
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default TodoForm
