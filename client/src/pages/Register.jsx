import { useState } from "react";
import Formrow from "../components/Formrow";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function register(event) {
    event.preventDefault();
    
    // Client-side validation
    if (name.length < 3) {
      return setMessage("Name must be at least 3 characters long.");
    }
    if (password.length < 8) {
      return setMessage("Password must be at least 8 characters long.");
    }

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ name, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setMessage("Registration successful!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Registration failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">
        Register
      </h2>
      {message && (
        <p className={`text-sm ${message.includes("failed") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
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
            type="password"
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

