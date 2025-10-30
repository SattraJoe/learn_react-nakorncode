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
        <li><a href="/2-components" className={link}>2-components</a></li>
        <li><a href="/3-props" className={link}>3-props</a></li>
        <li><a href="/4-children" className={link}>4-children</a></li>
        <li><a href="/5-conditional" className={link}>5-conditional</a></li>
        <li><a href="/6-list" className={link}>6-list</a></li>
        <li><a href="/7-event" className={link}>7-event</a></li>
        <li><a href="/8-state" className={link}>8-state</a></li>
        <li><a href="/9-snapshot" className={link}>9-snapshot</a></li>
        <li><a href="/10-reference-types" className={link}>10-reference-types</a></li>
        <li><a href="/11-immer" className={link}>11-immer</a></li>
        <li><a href="/12-two-way-binding" className={link}>12-two-way-binding</a></li>
      </ul>
    </>
  )
}
