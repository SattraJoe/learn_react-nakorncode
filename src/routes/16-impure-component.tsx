import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/16-impure-component')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ImpureCounter></ImpureCounter>
      <hr className="my-4"/>
      <ImpureCounter></ImpureCounter>
      <hr className="my-4"/>
      <PureCounter></PureCounter>
      <hr className="my-4"/>
      <PureCounter></PureCounter>
    </>
  )
}

let globalCount = 0 // Impure! Because it runs outside the scope, it is completely beyond the control of the function itself, but it allows us to change the value globally.
function ImpureCounter() {
  const [, manualReRender] = useState(0)
  return (
    <>
      <p className="text-lg font-bold mb-1">(Impure) Count: {globalCount}</p>
      <button onClick={() => globalCount++} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increase</button>
      <button onClick={() => manualReRender(Math.random())} className="ml-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Manual Re-render</button>
    </>
  )
}

function PureCounter() {
  const [count, setCount] = useState(0) // Pure! Because the data is under the control of the entire function, it just can't share the data globally (must use Redux or Zustand to help manage)
  return (
    <>
      <p className="text-lg font-bold mb-1">(Pure) Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increase</button>
    </>
  )
}
