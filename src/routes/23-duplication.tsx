import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/23-duplication')({
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

interface Product {
  id: number
  name: string
  price: number
  quantity?: number
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20, quantity: 9 },
  { id: 3, name: 'Product 3', price: 30 },
]

// ⚠️ It works, but the problem is that it will make Memory reserve more space to store Objects on the State.
function BadStructure() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  return (
    <>
      <ul className="list-disc pl-5">
        {products.map(product => (
          <li key={product.id}>
            <span>{product.name} - ${product.price}</span>
            <button onClick={() => setSelectedProduct(product)} className="underline text-blue-600 cursor-pointer ml-3">Select</button>
          </li>
        ))}
      </ul>
      <p className="mt-2 font-bold">Selected Product: {selectedProduct ? (
        <>
          <span>{selectedProduct.name} ({selectedProduct.quantity ?? 'No'})</span>
        </>
      ) : 'None'}</p>
    </>
  )
}

// ✅ It works better because it only stores the Number that references the Product ID in the State.
function GoodStructure() {
  const [id, setId] = useState<number | null>(null)
  const selectedProduct = products.find(product => product.id === id)
  return (
    <>
      <ul className="list-disc pl-5">
        {products.map(product => (
          <li key={product.id}>
            <span>{product.name} - ${product.price}</span>
            <button onClick={() => setId(product.id)} className="underline text-blue-600 cursor-pointer ml-3">Select</button>
          </li>
        ))}
      </ul>
      <p className="mt-2 font-bold">Selected Product: {selectedProduct ? (
        <>
          <span>{selectedProduct.name} ({selectedProduct.quantity ?? 'No'})</span>
        </>
      ) : 'None'}</p>
    </>
  )
}
