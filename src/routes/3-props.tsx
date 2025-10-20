import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/3-props')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <UserProfileProps
        name="John Doe"
        birthDate={new Date('2000-01-01')}
        darkTheme={true}
        grade={12}
      ></UserProfileProps>

      <hr className="my-4"/>

      <UserProfileDestructuring
        name="Jane Doe"
        birthDate={new Date('1998-10-14')}
        darkTheme={false}
        grade={11}
      ></UserProfileDestructuring>

      <hr className="my-4"/>

      <UserProfileDefault name='Anna' birthDate={new Date('2000-01-01')} darkTheme={false} grade={12}></UserProfileDefault>
    </>
  )
}

interface UserProfileProps {
  name: string
  birthDate: Date
  darkTheme: boolean,
  favoriteColor?: string,
  address?: string,
  grade: number,
}

// กำหนดผ่าน Props แบบไม่ Destructuring
function UserProfileProps(props: UserProfileProps) {
  return (
    <div className={`p-3 rounded-md border border-gray-200 shadow-lg ${props.darkTheme ? 'bg-gray-600 text-white' : 'bg-gray text-black'}`}>
      <h2>Name: {props.name}</h2>
      <p>Birth Date: {props.birthDate.toDateString()}</p>
    </div>
  )
}

// กำหนดผ่าน Props แบบ Destructuring
function UserProfileDestructuring({ name, birthDate, darkTheme }: UserProfileProps) {
  return (
    <div className={`p-3 rounded-md border border-gray-200 shadow-lg ${darkTheme ? 'bg-gray-600 text-white' : 'bg-gray text-black'}`}>
      <h2>Name: {name}</h2>
      <p>Birth Date: {birthDate.toDateString()}</p>
    </div>
  )
}

// กำหนดค่าเริ่มต้นให้กับ Props
function UserProfileDefault({
  name = '(Unknown)',
  birthDate = new Date(),
  darkTheme = false,
}: Partial<UserProfileProps>) {
  return (
    <div className={`p-3 rounded-md border border-gray-200 shadow-lg ${darkTheme ? 'bg-gray-600 text-white' : 'bg-gray text-black'}`}>
      <h2>Name: {name}</h2>
      <p>Birth Date: {birthDate.toDateString()}</p>
    </div>
  )
}
