import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useImmer } from 'use-immer'

export const Route = createFileRoute('/20-group-state')({
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

// ⚠️ It works but the number of states is too large.
function BadStructure() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState(new Date())
  const [gender, setGender] = useState<'male' | 'female'>('male')
  return (
    <>
      <ul className="list-disc pl-5">
        <li>Name: {firstName} {lastName}</li>
        <li>Birth Date: {birthDate.toDateString()}</li>
        <li>Gender: {gender}</li>
      </ul>
      <div className="space-y-1 mt-2">
        <div>
          <label>
            <span>First name: </span>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="border border-gray-300 px-2 py-1 rounded" />
          </label>
        </div>
        <div>
          <label>
            <span>Last name: </span>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="border border-gray-300 px-2 py-1 rounded" />
          </label>
        </div>
        <div>
          <label>
            <span>Birth Date: </span>
            <input type="date" value={birthDate.toISOString().split('T')[0]} onChange={e => setBirthDate(new Date(e.target.value))} className="border border-gray-300 px-2 py-1 rounded" />
          </label>
        </div>
        <div>
          <label>
            <span>Gender: </span>
            <select value={gender} onChange={e => setGender(e.target.value as 'male' | 'female')} className="border border-gray-300 px-2 py-1 rounded">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
      </div>
    </>
  )
}

// ✅ You can choose to use Object instead, but for convenience you should choose to use Immer additionally.
function GoodStructure() {
  const [user, setUser] = useImmer<{
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: "male" | "female";
    locale?: "th-TH" | "en-US";
  }>({
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    gender: "male",
    locale: "en-US",
  });
  return (
    <>
      <ul className="list-disc pl-5">
        <li>
          Name: {user.firstName} {user.lastName}
        </li>
        <li>Birth Date: {user.birthDate.toDateString()}</li>
        <li>Gender: {user.gender}</li>
      </ul>
      <div className="space-y-1 mt-2">
        <div>
          <label>
            <span>First name: </span>
            <input
              type="text"
              value={user.firstName}
              onChange={(e) =>
                setUser((draft) => {
                  draft.firstName = e.target.value;
                })
              }
              className="border border-gray-300 px-2 py-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            <span>Last name: </span>
            <input
              type="text"
              value={user.lastName}
              onChange={(e) =>
                setUser((draft) => {
                  draft.lastName = e.target.value;
                })
              }
              className="border border-gray-300 px-2 py-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            <span>Birth Date: </span>
            <input
              type="date"
              value={user.birthDate.toISOString().split("T")[0]}
              onChange={(e) =>
                setUser((draft) => {
                  draft.birthDate = new Date(e.target.value);
                })
              }
              className="border border-gray-300 px-2 py-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            <span>Gender: </span>
            <select
              value={user.gender}
              onChange={(e) =>
                setUser((draft) => {
                  draft.gender = e.target.value as "male" | "female";
                })
              }
              className="border border-gray-300 px-2 py-1 rounded"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
      </div>
    </>
  );
}
