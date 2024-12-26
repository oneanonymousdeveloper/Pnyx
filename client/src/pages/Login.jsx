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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Login</h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={login} className="space-y-6">
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
        <button type="Submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800">Login</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
