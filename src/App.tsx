import { useState } from "react";

// import './App.css'

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <>
      <h1>Hello World</h1>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <p>{`Firstname: ${firstName}, Lastname: ${lastName}`}</p>
    </>
  );
}

export default App;
