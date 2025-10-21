import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/6-list')({
  component: RouteComponent,
})

function RouteComponent() {
  const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  // const renderAlphabets = [];
  // for (let i = 0; i < alphabets.length; i++) {
  //   renderAlphabets.push(
  //     <div
  //       key={i}
  //       className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
  //     >
  //       {alphabets[i]}
  //     </div>
  //   );
  // }
  
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {/* Use map() on Arrays to rearrange the display method. */}
        {/* And always use key="" to identify Unique Key for performance improvement */}
        {alphabets.map((alphabet, index) => (
          <div key={index} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">{alphabet}</div>
        ))}
        {/* {renderAlphabets} */}
      </div>

      <hr className="my-4"/>

      <ProductList></ProductList>
    </>
  )
}

interface ProductItemProps {
  id: number
  name: string
  price: number
}

const products: ProductItemProps[] = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 200000 },
  { id: 3, name: 'Product 3', price: 3990 },
  { id: 4, name: 'Product 3', price: 4000 },
]

function ProductItem({ product }: { product: ProductItemProps }) {
  return (
    <div className="border border-gray-300 rounded-md p-3">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-sm">{product.price.toLocaleString()} ฿</p>
      <a className="block mt-2 text-center bg-blue-600 text-white py-1 rounded" href={`/products/${product.id}`}>View</a>
    </div>
  )
}

function ProductList() {
  return (
    <div className="flex justify-center flex-wrap gap-4">
      {/* Loop to display the results based on the number of Components. */}
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}
