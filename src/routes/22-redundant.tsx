import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/22-redundant')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <BadStructure></BadStructure>
      <hr className="my-4"/>
      <GoodStructure></GoodStructure>
    </>
  )
}

// ⚠️ Although it works, there are unnecessary calls to setFullName.
function BadStructure() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [fullName, setFullName] = useState('')
  function onFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value)
    setFullName(`${e.target.value} ${lastName}`)
  }
  function onLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value)
    setFullName(`${firstName} ${e.target.value}`)
  }
  return (
    <>
      <h2 className="font-bold mb-1">Name: {fullName}</h2>
      <div className="space-x-1">
        <input value={firstName} onChange={onFirstNameChange} className="border border-gray-300 px-2 py-1 rounded" placeholder="First name" />
        <input value={lastName} onChange={onLastNameChange} className="border border-gray-300 px-2 py-1 rounded" placeholder="Last name" />
      </div>
    </>
  )
}

// ✅ Although Re-render will run the function again, we can add logic to handle partial changes.
function GoodStructure() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const fullName = `${firstName} ${lastName}`
  return (
    <>
      <h2 className="font-bold mb-1">Name: {fullName}</h2>
      <div className="space-x-1">
        <input value={firstName} onChange={e => setFirstName(e.target.value)} className="border border-gray-300 px-2 py-1 rounded" placeholder="First name" />
        <input value={lastName} onChange={e => setLastName(e.target.value)} className="border border-gray-300 px-2 py-1 rounded" placeholder="Last name" />
      </div>
    </>
  )
}
