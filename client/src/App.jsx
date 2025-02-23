import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Welcome from "./Components/Welcome/Welcome";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Loading from "./Components/Loading/Loading";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/Dashboard",
    element: (
      <div>
        <Dashboard />
      </div>
    ),
  },
  {
    path: "/",
    element: (
      <div>
        <Welcome />
      </div>
    ),
  },
  {
    path: "/Login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/Register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>{isLoading ? <Loading /> : <RouterProvider router={router} />}</div>
  );
}

export default App;
