import { useState } from "react";
import Formrow from "../components/Formrow";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function register(event) {
    event.preventDefault();
    try {
      await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ name, password }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      alert(`Registration failed`);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
        Register
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={register} method="post" className="space-y-6">
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
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
