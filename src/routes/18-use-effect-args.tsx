import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/18-use-effect-args')({
  component: RouteComponent,
})

function RouteComponent() {
  const [show, setShow] = useState(true)
  return (
    <>
      {show && <TitleUpdater/>}
      <button onClick={() => setShow(!show)} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Toggle Show/Hide</button>

      <hr className="my-4" />

      <ProductFetcher></ProductFetcher>
    </>
  )
}

function TitleUpdater() {
  const [title, setTitle] = useState('My Website')

  // 1. Run every re-render (rarely used)
  useEffect(() => {
    console.log('Re-render triggered')
  })

  // 2. Run on mounted (once or run again when mounted again)
  useEffect(() => {
    console.log('Component mounted')
    return () => {
      // This is how we can Cleanup by returning a function callback which is when Unmounted
      console.log('Component unmounted')
    }
  }, [])

  // 3. Run on dependencies changed (Run only when data changes)
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 px-2 py-1 rounded" />
    </div>
  )
}

interface ProductItem {
  id: number
  title: string
  price: number
}

function ProductFetcher() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [page, setPage] = useState(1);

  // เนื่องจาก useEffect() ไม่สามารถใช้ Async ได้ จึงต้องใช้วิธีการสร้าง Async Function แยกออกมา
  async function fetchData() {
    const limit = 10;
    const skip = (page - 1) * limit;
    setLoading(true);
    const data = await fetch(
      `https://dummyjson.com/products?select=id,title,price&limit=${limit}&skip=${skip}`
    ).then((res) => res.json());
    setProducts(data.products);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <h1 className="font-bold mb-1">Product (Page: {page})</h1>
      <div className="flex gap-1 mb-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer"
        >
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer"
        >
          Next
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {/* ให้ตายเถอะ นี่แหละผมเลยไม่ชอบ JSX/TSX เวลาตั้งเงื่อนไขเยอะ 😅 */}
      {!loading &&
        (products.length > 0 ? (
          <ul className="list-disc pl-5">
            {products.map((product) => (
              <li key={product.id}>
                {product.title} - {product.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products</p>
        ))}
    </div>
  );
}
