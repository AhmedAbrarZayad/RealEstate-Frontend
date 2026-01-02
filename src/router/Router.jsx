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
import PrivateRoute from "../components/PrivateRoute";
import PropertyDetails from "../components/PropertyDetails";
import MyRatings from "../components/MyRatings";
import NotFound from "../components/NotFound";
import About from "../components/About";
import Contact from "../components/Contact";
import Profile from "../components/Profile";
import Dashboard from "../components/Dashboard";
import { API_BASE } from "../config/api";

const API_BASE_URL = API_BASE;
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
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "add-property",
        element: <PrivateRoute><AddProperties /></PrivateRoute>
      },
      {
        path: "my-properties",
        element: <PrivateRoute><MyProperties /></PrivateRoute>
      },
      {
        path: "my-ratings",
        element: <PrivateRoute><MyRatings /></PrivateRoute>
      },
      {
        path: "profile",
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>
      }
    ]
  },
  {
    path: "/login",
    element: <AuthProvider><Login /></AuthProvider>
  },
  {
    path: "/signup",
    element: <AuthProvider><Signup /></AuthProvider>
  },
  {
    path: '/property/:propertyId',
    element: <AuthProvider><PrivateRoute><PropertyDetails /></PrivateRoute></AuthProvider>,
    loader: async ({ params }) => {
      const properties = await fetch(`${API_BASE_URL}/property/${params.propertyId}`).then(res => res.json());
      const reviews = await fetch(`${API_BASE_URL}/reviews/${params.propertyId}`).then(res => res.json());
      return { property: properties, reviews: reviews };
    }
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

