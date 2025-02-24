import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Welcome from "./Components/Welcome/Welcome";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Preloader from "./Components/Preloader/Preloader";

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
  const [isPreloader, setIsPreloader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsPreloader(false);
    }, 2000);
  }, []);

  return (
    <div>{isPreloader ? <Preloader /> : <RouterProvider router={router} />}</div>
  );
}

export default App;
