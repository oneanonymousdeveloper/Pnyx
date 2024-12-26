import { useState } from "react";
import Formrow from "../components/Formrow";

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function register(event) {
    event.preventDefault();
    try {
      await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ name, password }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      alert(`Registration failed`)
    }
    
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={register} method="post">
        <Formrow
          name="name"
          labelText="Name"
          type="text"
          value={name}
          changeHandler={(event) => setName(event.target.value)}
        />
        <Formrow
          name="password"
          labelText="Password"
          type="text"
          value={password}
          changeHandler={(event) => setPassword(event.target.value)}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
