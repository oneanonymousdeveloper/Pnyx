import { useState } from "react";
import Formrow from "../components/Formrow";
import { Navigate} from 'react-router-dom'

const Login = () => {
  const [name, Setname] = useState("");
  const [password, Setpassword] = useState("");
  const [redirect, Setredirect] = useState(false);

  async function login(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ name, password }),
        headers: { "Content-Type": "application/json" },
        credentials : 'include'
      });
      if(response.ok){
        Setredirect(true);
      }
    } catch (error) {
      alert(`Login failed`)
    }
    
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <Formrow
          name="name"
          labelText="Name"
          type="text"
          value={name}
          changeHandler={(event) => Setname(event.target.value)}
        />
        <Formrow
          name="password"
          labelText="Password"
          type="text"
          value={password}
          changeHandler={(event) => Setpassword(event.target.value)}
        />
        <button type="Submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
