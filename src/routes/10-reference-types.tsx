import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/10-reference-types')({
  component: RouteComponent,
})

function RouteComponent() {
  const [todo, setTodo] = useState<string[]>([])
  const [todoText, setTodoText] = useState<string>('')
  function incorrectAddTodo() {
    todo.push(todoText)
    // ❌ You can add data but it will not re-render because todo set reference type todo is duplicated.
    setTodo(todo)
    // ⚠️ But superficially we will still see the result correctly because clearText() has a set new state
    // Therefore, the Re-render condition occurs, but if you try to comment out the line below, you will find that there is a problem with the data not updating.
    clearText()
  }
  function correctAddTodo() {
    // ✅ The Array must be copied by value separately, making it look like new data has been entered.
    setTodo([...todo, todoText])
    clearText()
  }
  function clearText() {
    setTodoText('')
  }
  return (
    <div>
      <h1 className="text-lg font-bold">Todo List</h1>
      <ul className="list-disc pl-5 mt-1">
        {todo.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div className="my-2">
        <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} placeholder="Add a todo"  className="border border-gray-300 px-2 py-1 rounded"/>
        <p className="text-sm text-gray-500">Text length: {todoText.length}</p>
      </div>

      <button type="button" onClick={incorrectAddTodo} className="mr-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Add (Incorrect)</button>
      <button type="button" onClick={correctAddTodo} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Add (Correct)</button>
    </div>
  )
}
