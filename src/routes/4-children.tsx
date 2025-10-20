import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export const Route = createFileRoute('/4-children')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      {/* แนะนำวิธีนี้ */}
      <SimpleCard>
        <h1>
          Name: <span className="font-bold">John Doe</span>
        </h1>
        <p>This is a simple card</p>
        <div className="mt-4 text-sm font-bold">
          <h1>Address:</h1>
          <p>123 Main St, Anytown, USA</p>
        </div>
      </SimpleCard>

      {/* วิธีการส่งข้อมูลแบบปกติ */}
      <SimpleCard children={<p>This is a simple card</p>} />

      <SimpleCard
        children={
          <>
            <h1>
              Name: <span className="font-bold">John Doe</span>
            </h1>
            <p>This is a simple card</p>
            <div className="mt-4 text-sm font-bold">
              <h1>Address:</h1>
              <p>123 Main St, Anytown, USA</p>
            </div>
          </>
        }
      />

      {/* ส่งแบบ Props ผสมกับ children */}
      <CardWithHeader
        header={
          <>
            <h1 className="font-bold text-lg">Title</h1>
          </>
        }
      >
        <p>This is card with header</p>
      </CardWithHeader>

      <CardWithHeader
        header={
          <>
            <h1 className="font-mono uppercase text-2xl">Title</h1>
          </>
        }
      >
        <p>This is card with header</p>
      </CardWithHeader>
    </>
  );
}

function SimpleCard(props: { children: ReactNode }) {
  return (
    <div className="bg-blue-100 text-blue-800 p-4 border-2 border-blue-200 shadow rounded-md mb-4">
      {props.children}
    </div>
  )
}

function CardWithHeader(props: { header: ReactNode; children: ReactNode }) {
  return (
    <div className="shadow border border-gray-200 rounded-md mb-4">
      <div className="px-3 py-1 bg-gray-200 rounded-t-md">
        {props.header}
      </div>
      <div className="p-3">
        {props.children}
      </div>
    </div>
  )
}
