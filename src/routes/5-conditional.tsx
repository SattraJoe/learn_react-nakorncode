import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/5-conditional')({
  component: RouteComponent,
})

function RouteComponent() {
  const showUser = true
  const showAge = true
  const isThai = false
  const rank = ''

  const age = 25
  let ageRank = "Child";
  switch (true) {
    case age >= 13 && age <= 19:
      ageRank = "Teenager";
      break;
    case age >= 20 && age <= 30:
      ageRank = "Young Adult";
      break;
    case age > 30 && age < 60:
      ageRank = "Adult";
      break;
    case age >= 60:
      ageRank = "Senior";
      break;
  }

  return (
    <>
      {/* ใช้ Short-Circuit Evaluation (AND) คือเมื่อ true ถึงจะแสดงผลเนื้อหาด้านขวา */}
      <p>User: {showUser && 'John Doe'}</p>
      <p>Age: {showAge && age} ({ageRank})</p>

      {/* ใช้ Ternary Operator */}
      <p>Language: {isThai ? 'Thai' : 'English'}</p>

      {/* ใช้ Short-Circuit Evaluation (OR) คือเมื่อ false จะใช้ค่าเริ่มต้นด้านขวาแทน */}
      <p>Rank: {rank || '(Empty)'}</p>

      <hr className="my-4"/>

      <RegisterForm title="Sign Up" withLogo={true} withConfirmPassword={true} darkTheme={true}></RegisterForm>

      <hr className="my-4"/>

      <RegisterForm withLogo={false} withConfirmPassword={true} darkTheme={false}></RegisterForm>
    </>
  )
}

interface RegisterFormProps {
  withLogo: boolean
  withConfirmPassword: boolean
  darkTheme: boolean
  title?: string
}

function RegisterForm(props: RegisterFormProps) {
  {/* ใช้ if(), else if(), else แบบปกติ เก็บข้อมูล HTML (XML) ลงบนตัวแปรก่อนใช้แสดงผล */}
  let confirmPassword
  if (props.withConfirmPassword) {
    confirmPassword = <input className="block bg-white !text-black px-2 py-1 rounded" type="text" name="confirmPassword" placeholder="Confirm Password" />
  }

  return (
    <div className={`p-4 rounded-md bg-gray-200 shadow ${props.darkTheme && 'bg-gray-800 text-white'}`}>
      {props.withLogo && <img src="https://placehold.co/300x100" className="mb-2 mx-auto" alt="Logo"/>}
      <h2 className="text-center mb-2 text-2xl">{props.title || 'Register Form'}</h2>
      <form className="flex flex-col items-center gap-2" action="/api/sign-up" method="post">
        <input className="block bg-white !text-black px-2 py-1 rounded" type="text" name="username" placeholder="Username" />
        <input className="block bg-white !text-black px-2 py-1 rounded" type="text" name="password" placeholder="Password" />
        {props.withConfirmPassword && <input className="block bg-white !text-black px-2 py-1 rounded" type="text" name="confirmPassword" placeholder="Confirm Password" />}
      </form>
    </div>
  )
}

// vue = v-if v-else
  // svelte = {#if} {:else if} {:else}