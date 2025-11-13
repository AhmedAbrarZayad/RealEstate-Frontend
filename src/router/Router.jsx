import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "../pages/Root";
import Home from "../components/Home";
import { AuthProvider } from "../auth/AuthProvider";
import Properties from "../components/Properties";
import AddProperties from "../components/AddProperties";
import MyProperties from "../components/MyProperties";
import Login from "../components/Login";
import Signup from "../components/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><Root /></AuthProvider>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "all-properties",
        element: <Properties />
      },
      {
        path: "add-property",
        element: <AddProperties />
      },
      {
        path: "my-properties",
        element: <MyProperties />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
]);

