import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/9-snapshot')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <IncorrectSnapshot></IncorrectSnapshot>

      <hr className="my-4"/>

      <CorrectSnapshot></CorrectSnapshot>

      <hr className="my-4"/>

      <BadProductFetcher></BadProductFetcher>

      <hr className="my-4"/>

      <GoodProductFetcher></GoodProductFetcher>

      <hr className="my-4"/>

      <BetterProductFetcher></BetterProductFetcher>
    </>
  )
}

// It is used incorrectly (but that doesn't mean we need to use Callbacks every time, only in cases where we call them repeatedly).
function IncorrectSnapshot() {
  const [count, setCount] = useState(0)
  function incrementOnce() {
    setCount(count + 1) // ✅ From 1 --> 2 normal
  }
  function incrementTwice() {
    setCount(count + 1) // From 1 --> 2 normal
    setCount(count + 1) // ❌ From 1 --> 2 again?
  }
  return (
    <div>
      <p className="mb-1">(Incorrect) Count: {count}</p>
      <button onClick={incrementOnce} className="mr-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increment +1</button>
      <button onClick={incrementTwice} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increment +2</button>
    </div>
  )
}
  
// It is used correctly
function CorrectSnapshot() {
  const [count, setCount] = useState(0)
  function incrementOnce() {
    setCount(count + 1) // ✅ From 1 --> 2 normal
  }
  function incrementTwice() {
    setCount(count => count + 1) // From 1 --> 2 normal
    setCount(count => count + 1) // ✅ From 2 --> 3 normal because Async Code runs after Callback
  }
  return (
    <div>
      <p className="mb-1">(Correct) Count: {count}</p>
      <button onClick={incrementOnce} className="mr-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increment +1</button>
      <button onClick={incrementTwice} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increment +2</button>
    </div>
  )
}

interface ProductItem {
  title: string
  description: string
  price: number
}

// Clicking too quickly may result in an incorrect snapshot.
function BadProductFetcher() {
  const [id, setId] = useState(1)
  const [product, setProduct] = useState<ProductItem | null>(null)
  async function fetchDataAndIncreaseId() {
    const response = await fetch(`https://dummyjson.com/products/${id}?select=title,description,price`)
    const data = await response.json()
    setProduct(data)
    // Clicking too quickly can cause the ID number to go back and forth, as the snapshot looks at all previous states.
    // Since setId() is called after the async operation completes, if some requests are slower, the ID may jump back and forth.
    // Additionally, there is a problem where the previous await may take so long that the ID is not updated in time.
    setId(id + 1)
  }
  return (
    <>
      <h1>(Bad) Next Product ID: {id}</h1>
      {!product && <p>Wait for data...</p>}
      {product && (
        <pre>{JSON.stringify(product, null, 2)}</pre>
      )}
      <button onClick={fetchDataAndIncreaseId} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Get data</button>
    </>
  )
}

function GoodProductFetcher() {
  const [id, setId] = useState(1)
  const [product, setProduct] = useState<ProductItem | null>(null)
  async function fetchDataAndIncreaseId() {
    // Fixed Snapshot data issue so no matter how fast you click, the page count will always be the latest page.
    // And it instructs to run before await to prevent async issues.
    setId((id) => id + 1)
    const response = await fetch(`https://dummyjson.com/products/${id}?select=title,description,price`)
    const data = await response.json()
    setProduct(data)
  }
  return (
    <>
      <h1>(Good) Next Product ID: {id}</h1>
      {!product && <p>Wait for data...</p>}
      {product && (
        <pre>{JSON.stringify(product, null, 2)}</pre>
      )}
      <button onClick={fetchDataAndIncreaseId} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Get data</button>
    </>
  )
}


function BetterProductFetcher() {
  const [id, setId] = useState(1)
  const [product, setProduct] = useState<ProductItem | null>(null)
  // Added a loading variable to support data loading and prevents redundant loading to prevent async function issues.
  const [loading, setLoading] = useState(false)
  async function fetchDataAndIncreaseId() {
    if (loading) return
    setLoading(true)
    setId((id) => id + 1)
    const response = await fetch(`https://dummyjson.com/products/${id}?select=title,description,price`)
    const data = await response.json()
    setProduct(data)
    setLoading(false)
  }
  return (
    <>
      <h1>(Better) Next Product ID: {id}</h1>
      {!product && <p>Wait for data...</p>}
      {product && (
        <pre>{JSON.stringify(product, null, 2)}</pre>
      )}
      <button disabled={loading} onClick={fetchDataAndIncreaseId} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer disabled:opacity-50">Get data</button>
    </>
  )
}
