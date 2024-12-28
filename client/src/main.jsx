import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Create from "./pages/Create.jsx";
import SingleBlog from "./pages/SingleBlog.jsx";
import Mainlayout from "./layouts/Mainlayout.jsx";
import { ClerkProvider} from "@clerk/clerk-react"
import UserContextProvider from "./UserContext";
import Edit from "./pages/Edit.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/:id",
        element: <SingleBlog />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path : '/edit/:id',
        element : <Edit/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode >
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <UserContextProvider >
      <RouterProvider router={router} />
      </UserContextProvider>
  </ClerkProvider>
  </StrictMode>
);
