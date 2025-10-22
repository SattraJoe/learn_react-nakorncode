import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/8-state')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Counter></Counter>

      <hr className="my-4"/>

      <Collapse>
        <div>Content</div>
      </Collapse>

      <hr className="my-4"/>

      <InputName></InputName>

      <hr className="my-4"/>

      <ProductData></ProductData>
    </>
  )
}

function Counter() {
  // useState will return [value, setValue] , and we can name this part freely.
  const [count, setCount] = useState(0)
  // This part will log twice, we will discuss it in the Side Effect chapter later
  console.log('Render with count value:', count)
  return (
    <div>
      <p>Count: {count}</p>
      {/* When setCount() is called, the component will re-render, which means this function will run again */}
      <button onClick={() => setCount(count + 1)} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer mt-1">Increment</button>
      <button onClick={() => setCount(count - 1)} className="ml-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer mt-1">Decrement</button>
    </div>
  )
}

function Collapse(props: { children: React.ReactNode }) {
  // You can use any initial value, such as Boolean.
  const [show, setShow] = useState(false)
  function toggleShow() {
    setShow(!show)
  }
  return (
    <div>
      <button type="button" onClick={toggleShow} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">{show ? 'Hide' : 'Show'}</button>
      {show && props.children}
    </div>
  )
}

function InputName() {
  const [name, setName] = useState('')
  function onNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function setNameToJohn() {
    setName('John')
  }
  return (
    <>
      <h1>Name: {name}</h1>
      {/* 2 Way binding is the connection of both Input & Output data simultaneously, allowing data to be changed and displayed simultaneously. */}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 px-2 py-1 rounded mt-1" />
      <button type="button" onClick={() => setName('John')} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 cursor-pointer rounded ml-1">Set name to 'John'</button>
      
      <hr className="my-4"/>
      <h1>Name: {name}</h1>
      <input type="text" value={name} onChange={onNameInputChange} className="border border-gray-300 px-2 py-1 rounded mt-1" /> 
      <button type="button" onClick={setNameToJohn} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 cursor-pointer rounded ml-1">Set name to 'John'</button>
      
    </>
  )
}

interface ProductInfo {
  name: string
  price: number
  isVisible: boolean
  imageUrl: string
}

function ProductData() {
  // You can define types through generics to specify the types of data that can change
  const [product, setProduct] = useState<ProductInfo>({
    name: 'Product A',
    price: 100,
    isVisible: true,
    imageUrl: 'https://via.placeholder.com/150'
  })
  return (
    <>
      <ul className="list-disc pl-5">
        <li>Name: {product.name}</li>
        <li>Price: {product.price.toLocaleString()}</li>
        <li>Visible: {product.isVisible ? '✅' : '❌'}</li>
      </ul>

      {/* In cases where you want to change an Object because it is a Reference Type, you need to use the Spread Operator, which you will learn in depth again. */}
      <div className="space-y-2 mt-3">
        <div>
          <label>
            <span className="mr-1">Name:</span>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="border border-gray-300 px-2 py-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            <span className="mr-1">Price:</span>
            <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} className="border border-gray-300 px-2 py-1 rounded"/>
          </label>
        </div>
        <div>
          <label>
            <span className="mr-1">Is visible?</span>
            <input id="isVisible" type="checkbox" checked={product.isVisible} onChange={(e) => setProduct({ ...product, isVisible: e.target.checked })}/>
          </label>
        </div>
      </div>
    </>
  )
}
