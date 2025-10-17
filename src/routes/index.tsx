import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const link = 'underline text-blue-600'
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Index</h1>
      <ul className="list-disc pl-5">
        <li><a href="/1-jsx" className={link}>1-jsx</a></li>
        
      </ul>
    </>
  )
}
